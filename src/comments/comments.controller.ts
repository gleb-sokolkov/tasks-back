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
  Query,
  UseGuards,
} from '@nestjs/common';
import { createCommentDto, findOneParams } from './dto/comments.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { AuthParamAndRolesGuard } from 'src/auth/auth-param.guard';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Comment } from './comments.model';
import { RestAPIRoutes } from 'src/restAPI/restAPI.interface';
import { Payload } from 'src/auth/dto/auth.dto';
import { User } from 'src/auth/auth.decorator';

@ApiTags('Комментарии')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Токен доступа',
})
@Controller()
export class CommentsController
  implements RestAPIRoutes<Comment, findOneParams, createCommentDto>
{
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
  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(
    @Param() params: findOneParams,
    @Body() dto: createCommentDto,
  ) {
    return this.commentsService.createOne(params, dto);
  }

  @ApiOperation({ summary: 'Удалить один комментарий' })
  @ApiResponse({ status: HttpStatus.OK })
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @Put(':comment_id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param() params: findOneParams,
    @Body() dto: createCommentDto,
  ) {
    return this.commentsService.updateOne(params, dto);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async createOneOpen(
    @Param() params: findOneParams,
    @Body() dto: createCommentDto,
    @Query('state') state: string,
  ) {
    console.log(state === 'open');
    //return this.commentsService.createOne(params, dto);
  }
}
