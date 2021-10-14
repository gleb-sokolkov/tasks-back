import { CommentsService } from './comments.service';
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
import { createCommentDto, findOneParams } from './dto/comments.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { AuthParamAndRolesGuard } from 'src/auth/auth-param.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Comment } from './comments.model';

@ApiTags('Комментарии')
@ApiBearerAuth()
@Controller()
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Найти один комментарий' })
  @ApiResponse({ status: HttpStatus.OK, type: Comment })
  @UseGuards(AuthGuard)
  @Get(':comment_id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param() params: findOneParams) {
    return this.commentsService.findOne(params);
  }

  @ApiOperation({ summary: 'Найти все комментарии' })
  @ApiResponse({ status: HttpStatus.OK, type: [Comment] })
  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Param() params: findOneParams) {
    return this.commentsService.findAll(params);
  }

  @ApiOperation({ summary: 'Создать новый комментарий' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Comment })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOneByAnother(
    @Param() params: findOneParams,
    @Body() dto: createCommentDto,
  ) {
    return this.commentsService.createOne(params, dto);
  }

  @ApiOperation({ summary: 'Удалить один комментарий' })
  @ApiResponse({ status: HttpStatus.OK })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Delete(':comment_id')
  @HttpCode(HttpStatus.OK)
  async deleteOne(@Param() params: findOneParams) {
    return this.commentsService.deleteOne(params);
  }

  @ApiOperation({ summary: 'Удалить все комментарии' })
  @ApiResponse({ status: HttpStatus.OK })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteAll(@Param() params: findOneParams) {
    return this.commentsService.deleteAll(params);
  }

  @ApiOperation({ summary: 'Обновить один комментарий' })
  @ApiResponse({ status: HttpStatus.OK, type: Comment })
  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Put(':comment_id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param() params: findOneParams,
    @Body() dto: createCommentDto,
  ) {
    return this.commentsService.updateOne(params, dto);
  }
}
