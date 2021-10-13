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
}

@Table({ tableName: 'comment' })
export class Comment extends ModelWithID<Comment, createCommentAttrs> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  message: string;

  @BelongsTo(() => Card)
  card: Card;

  @ForeignKey(() => Card)
  @Column({ type: DataType.INTEGER, allowNull: false })
  card_id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;
}
