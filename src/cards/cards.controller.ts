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
  UseGuards,
} from '@nestjs/common';
import { findOneParams, createCardDto } from './dto/cards.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { AuthParamAndRolesGuard } from 'src/auth/auth-param.guard';

@Controller()
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @UseGuards(AuthGuard)
  @Get(':card_id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param() params: findOneParams) {
    return this.cardsService.findOne(params);
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Param() params: findOneParams) {
    return this.cardsService.findAll(params);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(@Param() params: findOneParams, @Body() dto: createCardDto) {
    return this.cardsService.createOne(params, dto);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Delete(':card_id')
  @HttpCode(HttpStatus.OK)
  async deleteOne(@Param() params: findOneParams) {
    return this.cardsService.deleteOne(params);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteAll(@Param() params: findOneParams) {
    return this.cardsService.deleteAll(params);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Put(':card_id')
  @HttpCode(HttpStatus.OK)
  async updateOne(@Param() params: findOneParams, @Body() dto: createCardDto) {
    return this.cardsService.updateOne(params, dto);
  }
}
