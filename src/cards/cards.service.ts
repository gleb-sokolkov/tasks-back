import { ColumnsService } from 'src/columns/columns.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { findOneParams, createCardDto } from './dto/cards.dto';
import { Column } from 'src/columns/columns.model';
import { Card } from './cards.model';
import { RestAPIService } from 'src/restAPI/restAPI.interface';

@Injectable()
export class CardsService
  implements RestAPIService<Card, findOneParams, createCardDto>
{
  constructor(
    @InjectModel(Card) private cardsRepository: typeof Card,
    private columnsService: ColumnsService,
  ) {}

  async findOne(params: findOneParams) {
    const card = await this.cardsRepository.findOne({
      where: {
        id: params.card_id,
        column_id: params.column_id,
      },
      include: [Column],
    });

    if (!card) {
      throw new BadRequestException({
        message: `Не удалось найти карточку с id=${params.card_id} пользователя с id=${params.user_id}`,
      });
    } else {
      return card;
    }
  }

  async findAll(params: findOneParams) {
    const cards = await this.cardsRepository.findAll({
      where: { column_id: params.column_id },
      include: [Column],
    });

    if (cards.length === 0) {
      throw new BadRequestException({
        message: `Карточек в колонке с id=${params.column_id} не найдено`,
      });
    } else {
      return cards;
    }
  }

  async createOne(params: findOneParams, dto: createCardDto) {
    try {
      const card = await this.cardsRepository.create(
        Object.assign(dto, {
          column_id: parseInt(params.column_id),
        }),
        { include: [Column] },
      );
      return card;
    } catch (ex) {
      console.log(ex);
      throw new BadRequestException({
        message: `Колонки с id=${params.column_id} не существует`,
      });
    }
  }

  async deleteOne(params: findOneParams) {
    const status = await this.cardsRepository.destroy({
      where: {
        id: params.card_id,
        column_id: params.column_id,
      },
    });

    if (!status) {
      throw new BadRequestException({
        message: `Карточка с id=${params.card_id} пользователя id=${params.user_id} не найдена`,
      });
    }
  }

  async deleteAll(params: findOneParams) {
    const status = this.cardsRepository.destroy({
      where: { column_id: params.column_id },
    });

    if (!status) {
      throw new BadRequestException({
        message: `Карточкек в колонке с id=${params.column_id} не найдено`,
      });
    }
  }

  async updateOne(params: findOneParams, dto: createCardDto) {
    try {
      const result = await this.cardsRepository.update(dto, {
        where: {
          id: params.card_id,
          column_id: params.column_id,
        },
        returning: true,
      });
      return result[1][0];
    } catch (ex) {
      throw new BadRequestException({
        message: `Не удалось обновить карточку с id=${params.card_id} пользователя с id=${params.user_id}`,
      });
    }
  }
}
