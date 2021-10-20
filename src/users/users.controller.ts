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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RestAPIRoutes } from 'src/restAPI/restAPI.interface';

@ApiTags('Пользователи')
@ApiBearerAuth()
@Controller()
export class UsersController
  implements RestAPIRoutes<User, findOneParams, createUserDto>
{
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Param() params: findOneParams) {
    return this.usersService.findAll(params);
  }

  @ApiOperation({ summary: 'Получить существующего пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @UseGuards(AuthGuard)
  @Get(':user_id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param() params: findOneParams) {
    return this.usersService.findOne(params);
  }

  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(@Param() params: findOneParams, @Body() dto: createUserDto) {
    return this.usersService.createOne(params, dto);
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
  async deleteAll(@Param() params: findOneParams) {
    this.usersService.deleteAll(params);
  }

  @ApiOperation({ summary: 'Удалить существующего пользователя' })
  @ApiResponse({ status: HttpStatus.OK })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':user_id')
  @HttpCode(HttpStatus.OK)
  async deleteOne(@Param() params: findOneParams) {
    await this.usersService.deleteOne(params);
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
