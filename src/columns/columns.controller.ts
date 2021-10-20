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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Column } from './columns.model';
import { RestAPIRoutes } from 'src/restAPI/restAPI.interface';

@ApiTags('Колонки')
@ApiBearerAuth()
@Controller()
export class ColumnsController
  implements RestAPIRoutes<Column, findOneParams, createColumnDto>
{
  constructor(private columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'Найти одну колонку' })
  @ApiResponse({ status: HttpStatus.OK, type: Column })
  @UseGuards(AuthGuard)
  @Get(':column_id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param() params: findOneParams) {
    return this.columnsService.findOne(params);
  }

  @ApiOperation({ summary: 'Найти все колонки' })
  @ApiResponse({ status: HttpStatus.OK, type: [Column] })
  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Param() params: findOneParams) {
    return this.columnsService.findAll(params);
  }

  @ApiOperation({ summary: 'Создать новую колонку' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Column })
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

  @ApiOperation({ summary: 'Удалить одну колонку' })
  @ApiResponse({ status: HttpStatus.OK })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Delete(':column_id')
  @HttpCode(HttpStatus.OK)
  async deleteOne(@Param() params: findOneParams) {
    return this.columnsService.deleteOne(params);
  }

  @ApiOperation({ summary: 'Удалить все колонки' })
  @ApiResponse({ status: HttpStatus.OK })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteAll(@Param() params: findOneParams) {
    return this.columnsService.deleteAll(params);
  }

  @ApiOperation({ summary: 'Обновить одну колонку' })
  @ApiResponse({ status: HttpStatus.OK, type: Column })
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
