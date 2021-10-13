import { ColumnsService } from './columns.service';
import { findOneParams, createColumnDto } from './dto/columns.dto';
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

  @Delete(':column_id')
  @HttpCode(HttpStatus.OK)
  async deleteOne(@Param() params: findOneParams) {
    return this.columnsService.deleteOne(params);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteAll(@Param() params: findOneParams) {
    return this.columnsService.deleteAll(params);
  }

  @Put(':column_id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param() params: findOneParams,
    @Body() dto: createColumnDto,
  ) {
    return this.columnsService.updateOne(params, dto);
  }
}
