import { ColumnsService } from './columns.service';
import { findOneParams, createColumnDto } from './dto/columns.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

@Controller()
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @Get(':column_id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param() params: findOneParams) {
    return this.columnsService.findOne(params);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Param() params: findOneParams) {
    return this.columnsService.findAll(params);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(
    @Param() params: findOneParams,
    @Body() dto: createColumnDto,
  ) {
    return this.columnsService.createOne(params, dto);
  }
}
