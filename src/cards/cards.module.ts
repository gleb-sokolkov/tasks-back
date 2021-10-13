import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { ColumnsModule } from 'src/columns/columns.module';
import { CardsController } from './cards.controller';
import { Card } from './cards.model';
import { CardsService } from './cards.service';

@Module({
  imports: [SequelizeModule.forFeature([Card]), ColumnsModule, AuthModule],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
