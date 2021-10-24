import { ModelWithID } from './../models/models';
import { Role } from './../roles/roles.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { UserRole } from 'src/roles/user-roles.model';
import { Column as column } from 'src/columns/columns.model';
import { Comment } from 'src/comments/comments.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'user', timestamps: true })
export class User extends ModelWithID<User, UserCreationAttrs> {
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

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => column, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  columns: column[];

  @HasMany(() => Comment, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  comments: Comment[];
}
