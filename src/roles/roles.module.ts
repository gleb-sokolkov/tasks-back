import { UserRole } from './user-roles.model';
import { Role } from './roles.model';
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User, UserRole])],
  exports: [RolesService],
})
export class RolesModule {}
