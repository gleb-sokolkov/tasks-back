import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ColumnsController } from './columns.controller';
import { Column } from './columns.model';
import { ColumnsService } from './columns.service';

@Module({
  imports: [SequelizeModule.forFeature([Column]), UsersModule, AuthModule],
  controllers: [ColumnsController],
  providers: [ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
