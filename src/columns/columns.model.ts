import { User } from './../users/users.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Column as column,
  DataType,
  ForeignKey,
  Table,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Card } from 'src/cards/cards.model';
import { ModelWithID } from 'src/models/models';

interface columnCreationAttrs {
  name: string;
}

@Table({ tableName: 'column' })
export class Column extends ModelWithID<Column, columnCreationAttrs> {
  @ApiProperty({
    example: 'Колонка1',
    description: 'Имя колонки',
    type: String,
  })
  @column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'column',
  })
  name: string;

  @ApiProperty({
    example: '19',
    description: 'Внешний ключ пользователя',
    type: Number,
  })
  @ForeignKey(() => User)
  @column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Card, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  cards: Card[];
}
