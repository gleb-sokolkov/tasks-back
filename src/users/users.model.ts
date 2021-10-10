import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'user', timestamps: true })
export class User extends Model<User, UserCreationAttrs> {
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

  @ApiProperty({
    example: 'email@email.domain',
    description: 'Почта пользователя',
    type: String,
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: 'Axs@xsa1sj',
    description: 'Пароль пользователя',
    minimum: 7,
    maximum: 20,
    type: String,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
