import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Card } from 'src/cards/cards.model';
import { ModelWithID } from 'src/models/models';
import { User } from 'src/users/users.model';

interface createCommentAttrs {
  message: string;
  card_id: number;
  user_id: number;
}

@Table({ tableName: 'comment' })
export class Comment extends ModelWithID<Comment, createCommentAttrs> {
  @ApiProperty({
    example: 'Привет',
    description: 'Текст сообщения',
    nullable: false,
    type: String,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  message: string;

  @BelongsTo(() => Card)
  card: Card;

  @ApiProperty({
    example: '42',
    description: 'Внешний ключ карточки',
    nullable: false,
    type: Number,
  })
  @ForeignKey(() => Card)
  @Column({ type: DataType.INTEGER, allowNull: false })
  card_id: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({
    example: '22',
    description: 'Внешний ключ пользователя',
    nullable: false,
    type: Number,
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;
}
