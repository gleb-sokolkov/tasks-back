import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: '74',
    description: 'Уникальный идентификатор',
    nullable: false,
    type: Number,
  })
  @column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'todo something',
    description: 'Имя карточки',
    nullable: false,
    type: String,
  })
  @column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'card',
  })
  name: string;

  @ApiProperty({
    example: 'Описание',
    description: 'Описание карточки',
    type: String,
  })
  @column({
    type: DataType.STRING,
  })
  description: string;

  @BelongsTo(() => Column)
  column: Column;

  @ApiProperty({
    example: '24',
    description: 'Внешний ключ колонки',
    nullable: false,
    type: Number,
  })
  @ForeignKey(() => Column)
  @column({ type: DataType.INTEGER, allowNull: false })
  column_id: number;

  @HasMany(() => Comment)
  comments: Comment[];
}
