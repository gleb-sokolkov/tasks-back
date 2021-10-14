import { CardsService } from './../cards/cards.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createCommentDto, findOneParams } from './dto/comments.dto';
import { Card } from 'src/cards/cards.model';
import { User } from 'src/users/users.model';
import { Comment } from 'src/comments/comments.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentsRepository: typeof Comment,
    private cardsService: CardsService,
  ) {}

  async findOne(params: findOneParams) {
    const card = await this.cardsService.findOne(params);

    const comment = await card.$get('comments', {
      where: { id: params.comment_id },
      include: [Card, User],
    });

    if (!comment[0]) {
      throw new BadRequestException({
        message: `Не удалось найти комментарий с id=${params.comment_id} пользователя с id=${params.user_id}`,
      });
    } else {
      return comment[0];
    }
  }

  async findAll(params: findOneParams) {
    const card = await this.cardsService.findOne(params);
    return await card.$get('comments', {
      include: [Card, User],
    });
  }

  async createOne(params: findOneParams, dto: createCommentDto) {
    try {
      const card = await this.cardsService.findOne(params);
      return await card.$create(
        'comment',
        Object.assign(dto, { user_id: params.user_id }),
        {
          include: [Card, User],
        },
      );
    } catch (ex) {
      console.log(ex);
      throw new BadRequestException({
        message: `Карточки с id=${params.card_id} не существует`,
      });
    }
  }

  async deleteOne(params: findOneParams) {
    const comment = await this.findOne(params);
    comment.destroy();
  }

  async deleteAll(params: findOneParams) {
    const comments = await this.findAll(params);
    comments.forEach((comment) => comment.destroy());
  }

  async updateOne(params: findOneParams, dto: createCommentDto) {
    try {
      const result = await this.commentsRepository.update(dto, {
        where: {
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
