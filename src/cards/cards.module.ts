import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ColumnsModule } from 'src/columns/columns.module';
import { CardsController } from './cards.controller';
import { Card } from './cards.model';
import { CardsService } from './cards.service';

@Module({
  imports: [SequelizeModule.forFeature([Card]), ColumnsModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
