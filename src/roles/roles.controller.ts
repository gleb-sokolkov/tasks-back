import { Role } from './roles.model';
import { createRoleDto, findOneParams } from './dto/role.dto';
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
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RestAPIRoutes } from 'src/restAPI/restAPI.interface';

@ApiTags('Роли')
@ApiBearerAuth()
@Controller()
export class RolesController
  implements RestAPIRoutes<Role, findOneParams, createRoleDto>
{
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Получить все роли' })
  @ApiResponse({ status: HttpStatus.OK, type: [Role] })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Param() params: findOneParams) {
    return this.rolesService.findAll(params);
  }

  @ApiOperation({
    summary: 'Получить существующую роль',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':role_id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param() params: findOneParams) {
    return this.rolesService.findOne(params);
  }

  @ApiOperation({ summary: 'Создать роль' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(@Param() params: findOneParams, @Body() dto: createRoleDto) {
    return this.rolesService.createOne(params, dto);
  }
}
