import { CardsService } from './cards.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { findOneParams, createCardDto } from './dto/cards.dto';

@Controller()
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get(':card_id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param() params: findOneParams) {
    return this.cardsService.findOne(params);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Param() params: findOneParams) {
    return this.cardsService.findAll(params);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(@Param() params: findOneParams, @Body() dto: createCardDto) {
    return this.cardsService.createOne(params, dto);
  }

  @Delete(':card_id')
  @HttpCode(HttpStatus.OK)
  async deleteOne(@Param() params: findOneParams) {
    return this.cardsService.deleteOne(params);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteAll(@Param() params: findOneParams) {
    return this.cardsService.deleteAll(params);
  }

  @Put(':card_id')
  @HttpCode(HttpStatus.OK)
  async updateOne(@Param() params: findOneParams, @Body() dto: createCardDto) {
    return this.cardsService.updateOne(params, dto);
  }
}
