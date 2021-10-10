import { User } from './users.model';
import { createUserDto, findOneParams, updateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Получить существующего пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param() id: findOneParams) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() dto: createUserDto) {
    return this.usersService.createUser(dto);
  }

  @ApiOperation({ summary: 'Обновить существующего пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param() findOneParams: findOneParams,
    @Body() dto: updateUserDto,
  ) {
    return this.usersService.updateOne(findOneParams, dto);
  }

  @ApiOperation({ summary: 'Удалить всех пользователей' })
  @ApiResponse({ status: HttpStatus.OK })
  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteAll() {
    this.usersService.deleteAll();
  }

  @ApiOperation({ summary: 'Удалить существующего пользователя' })
  @ApiResponse({ status: HttpStatus.OK })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteOne(@Param() findOneParams: findOneParams) {
    await this.usersService.deleteOne(findOneParams);
  }
}
