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
import { ModelWithID } from 'src/models/models';

interface createCardAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'card' })
export class Card extends ModelWithID<Card, createCardAttrs> {
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

  @HasMany(() => Comment, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  comments: Comment[];
}
