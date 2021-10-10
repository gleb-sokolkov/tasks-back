import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { UserRole } from './user-roles.model';

interface roleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'role', timestamps: false })
export class Role extends Model<Role, roleCreationAttrs> {
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
    example: 'ADMIN',
    description: 'Значение роли',
    type: String,
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @ApiProperty({
    example: 'Роль администратора',
    description: 'Описание роли',
    type: String,
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRole)
  role: User[];
}
