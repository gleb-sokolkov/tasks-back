import { Role } from './roles.model';
import { createRoleDto } from './dto/role.dto';
import { RolesService } from './roles.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { findOneParams } from 'src/users/dto/user.dto';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Получить все роли' })
  @ApiResponse({ status: HttpStatus.OK, type: [Role] })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({
    summary: 'Получить существующую роль',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param() id: findOneParams) {
    return this.rolesService.findOne(id);
  }

  @ApiOperation({ summary: 'Создать роль' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createRole(@Body() dto: createRoleDto) {
    return this.rolesService.createRole(dto);
  }
}
