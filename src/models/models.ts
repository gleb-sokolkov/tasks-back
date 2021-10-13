import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model } from 'sequelize-typescript';

export class ModelWithID<T, C> extends Model<T, C> {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор',
    type: Number,
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
}
