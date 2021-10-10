import { Role } from './roles.model';
import {
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

@Table({ tableName: 'userRole', timestamps: false })
export class UserRole extends Model<UserRole> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Index({
    name: 'user-role',
    unique: true,
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userID: string;

  @Index('user-role')
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleID: string;
}
