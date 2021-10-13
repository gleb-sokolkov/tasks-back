import { AuthGuard } from './../auth/auth.guard';
import { User } from './users.model';
import { changeRolesDto, createUserDto, findOneParams } from './dto/user.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';

@ApiTags('Пользователи')
@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Получить существующего пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @UseGuards(AuthGuard)
  @Get(':user_id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param() id: findOneParams) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() dto: createUserDto) {
    return this.usersService.createUser(dto);
  }

  @ApiOperation({ summary: 'Обновить существующего пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':user_id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param() findOneParams: findOneParams,
    @Body() dto: createUserDto,
  ) {
    return this.usersService.updateOne(findOneParams, dto);
  }

  @ApiOperation({ summary: 'Удалить всех пользователей' })
  @ApiResponse({ status: HttpStatus.OK })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteAll() {
    this.usersService.deleteAll();
  }

  @ApiOperation({ summary: 'Удалить существующего пользователя' })
  @ApiResponse({ status: HttpStatus.OK })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':user_id')
  @HttpCode(HttpStatus.OK)
  async deleteOne(@Param() findOneParams: findOneParams) {
    await this.usersService.deleteOne(findOneParams);
  }

  @ApiOperation({ summary: 'Изменить права пользователя' })
  @ApiResponse({ status: HttpStatus.OK })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':user_id')
  @HttpCode(HttpStatus.OK)
  async patchRoles(@Body() dto: changeRolesDto, @Param() id: findOneParams) {
    return await this.usersService.changeRoles(id, dto);
  }
}
