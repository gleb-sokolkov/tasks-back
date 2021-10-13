import {
  Model,
  Table,
  Column as column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Column } from 'src/columns/columns.model';
import { Comment } from 'src/comments/comments.model';

interface createCardAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'card' })
export class Card extends Model<Card, createCardAttrs> {
  @column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'card',
  })
  name: string;

  @column({
    type: DataType.STRING,
  })
  description: string;

  @BelongsTo(() => Column)
  column: Column;

  @ForeignKey(() => Column)
  @column({ type: DataType.INTEGER, allowNull: false })
  column_id: number;

  @HasMany(() => Comment)
  comments: Comment[];
}
