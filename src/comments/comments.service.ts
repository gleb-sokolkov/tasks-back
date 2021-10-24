import { CardsService } from './../cards/cards.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createCommentDto, findOneParams } from './dto/comments.dto';
import { Card } from 'src/cards/cards.model';
import { User } from 'src/users/users.model';
import { Comment } from 'src/comments/comments.model';
import { RestAPIService } from 'src/restAPI/restAPI.interface';

@Injectable()
export class CommentsService
  implements RestAPIService<Comment, findOneParams, createCommentDto>
{
  constructor(
    @InjectModel(Comment) private commentsRepository: typeof Comment,
    private cardsService: CardsService,
  ) {}

  async findOne(params: findOneParams) {
    const comment = await this.commentsRepository.findOne({
      where: {
        id: params.comment_id,
        card_id: params.card_id,
      },
      include: [Card, User],
    });

    if (!comment) {
      throw new BadRequestException({
        message: `Не удалось найти комментарий с id=${params.comment_id} пользователя с id=${params.user_id}`,
      });
    } else {
      return comment;
    }
  }

  async findAll(params: findOneParams) {
    const comments = await this.commentsRepository.findAll({
      where: { card_id: params.card_id },
      include: [Card, User],
    });

    if (comments.length === 0) {
      throw new BadRequestException({
        message: `Комментариев в карточке с id=${params.card_id} не найдено`,
      });
    } else {
      return comments;
    }
  }

  async createOne(params: findOneParams, dto: createCommentDto) {
    try {
      const comment = await this.commentsRepository.create(
        Object.assign(dto, {
          card_id: parseInt(params.card_id),
          user_id: parseInt(params.user_id),
        }),
        { include: [Card, User] },
      );
      return comment;
    } catch (ex) {
      console.log(ex);
      throw new BadRequestException({
        message: `Карточки с id=${params.card_id} не существует`,
      });
    }
  }

  async deleteOne(params: findOneParams) {
    const status = await this.commentsRepository.destroy({
      where: {
        id: params.comment_id,
        user_id: params.user_id,
        card_id: params.card_id,
      },
    });

    if (!status) {
      throw new BadRequestException({
        message: `Комментарий с id=${params.comment_id} пользователя id=${params.user_id} не найден`,
      });
    }
  }

  async deleteAll(params: findOneParams) {
    const status = this.commentsRepository.destroy({
      where: { card_id: params.card_id },
    });

    if (!status) {
      throw new BadRequestException({
        message: `Комментариев в карточке с id=${params.card_id} не найдено`,
      });
    }
  }

  async updateOne(params: findOneParams, dto: createCommentDto) {
    try {
      const result = await this.commentsRepository.update(dto, {
        where: {
          id: params.comment_id,
          user_id: params.user_id,
          card_id: params.card_id,
        },
        returning: true,
      });
      return result[1][0];
    } catch (ex) {
      throw new BadRequestException({
        message: `Не удалось обновить комментарий с id=${params.comment_id} пользователя с id=${params.user_id}`,
      });
    }
  }
}
