import { Role } from './roles.model';
import { createRoleDto } from './dto/role.dto';
import { RolesService } from './roles.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { findOneParams } from 'src/users/dto/user.dto';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Роли')
@ApiBearerAuth()
@Controller()
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Получить все роли' })
  @ApiResponse({ status: HttpStatus.OK, type: [Role] })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({
    summary: 'Получить существующую роль',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param() id: findOneParams) {
    return this.rolesService.findOne(id);
  }

  @ApiOperation({ summary: 'Создать роль' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createRole(@Body() dto: createRoleDto) {
    return this.rolesService.createRole(dto);
  }
}
