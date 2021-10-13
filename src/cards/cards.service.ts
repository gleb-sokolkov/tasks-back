import { ColumnsService } from 'src/columns/columns.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { findOneParams, createCardDto } from './dto/cards.dto';
import { Column } from 'src/columns/columns.model';
import { Card } from './cards.model';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card) private cardsRepository: typeof Card,
    private columnsService: ColumnsService,
  ) {}

  async findOne(params: findOneParams) {
    const column = await this.columnsService.findOne(params);

    const card = await column.$get('cards', {
      where: { id: params.card_id },
      include: [Column],
    });

    if (!card[0]) {
      throw new BadRequestException({
        message: `Не удалось найти карточку с id=${params.card_id} пользователя с id=${params.user_id}`,
      });
    } else {
      return card[0];
    }
  }

  async findAll(params: findOneParams) {
    const column = await this.columnsService.findOne(params);
    return await column.$get('cards', {
      include: [Column],
    });
  }

  async createOne(params: findOneParams, dto: createCardDto) {
    try {
      const column = await this.columnsService.findOne(params);
      return await column.$create('card', dto, {
        include: [Column],
      });
    } catch (ex) {
      console.log(ex);
      throw new BadRequestException({
        message: `Колонки с id=${params.column_id} не существует`,
      });
    }
  }

  async deleteOne(params: findOneParams) {
    const card = await this.findOne(params);
    card.destroy();
  }

  async deleteAll(params: findOneParams) {
    const cards = await this.findAll(params);
    cards.forEach((card) => card.destroy());
  }

  async updateOne(params: findOneParams, dto: createCardDto) {
    await this.findOne(params);
    try {
      const card = await this.findOne(params);
      for (const [key, value] of Object.entries(dto)) {
        card[key] = value;
      }
      return await card.save();
    } catch (ex) {
      throw new BadRequestException({
        message: `Не удалось обновить колонку с id=${params.column_id} пользователя с id=${params.user_id}`,
      });
    }
  }
}
