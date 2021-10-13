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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthParamAndRolesGuard } from 'src/auth/auth-param.guard';
import { Roles } from 'src/roles/roles.decorator';

@Controller()
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @UseGuards(AuthGuard)
  @Get(':column_id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param() params: findOneParams) {
    return this.columnsService.findOne(params);
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Param() params: findOneParams) {
    return this.columnsService.findAll(params);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(
    @Param() params: findOneParams,
    @Body() dto: createColumnDto,
  ) {
    return this.columnsService.createOne(params, dto);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Delete(':column_id')
  @HttpCode(HttpStatus.OK)
  async deleteOne(@Param() params: findOneParams) {
    return this.columnsService.deleteOne(params);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteAll(@Param() params: findOneParams) {
    return this.columnsService.deleteAll(params);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Put(':column_id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param() params: findOneParams,
    @Body() dto: createColumnDto,
  ) {
    return this.columnsService.updateOne(params, dto);
  }
}
