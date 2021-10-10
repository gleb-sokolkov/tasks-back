import { RolesModule } from './../roles/roles.module';
import { UserRole } from './../roles/user-roles.model';
import { Role } from './../roles/roles.model';
import { User } from './users.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRole]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
