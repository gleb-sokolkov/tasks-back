import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { ColumnsController } from './columns.controller';
import { Column } from './columns.model';
import { ColumnsService } from './columns.service';

@Module({
  imports: [SequelizeModule.forFeature([Column]), UsersModule],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
