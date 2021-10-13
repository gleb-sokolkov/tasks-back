import { CommentsService } from './comments.service';
import {
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
import { findOneParams, paramsAndDto } from './dto/comments.dto';
import { AnotherUser } from './comments.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { AuthParamAndRolesGuard } from 'src/auth/auth-param.guard';

@Controller()
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Get(':comment_id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param() params: findOneParams) {
    return this.commentsService.findOne(params);
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Param() params: findOneParams) {
    return this.commentsService.findAll(params);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOneByAnother(@AnotherUser() data: paramsAndDto) {
    return this.commentsService.createOne(data.params, data.dto);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Delete(':comment_id')
  @HttpCode(HttpStatus.OK)
  async deleteOne(@Param() params: findOneParams) {
    return this.commentsService.deleteOne(params);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteAll(@Param() params: findOneParams) {
    return this.commentsService.deleteAll(params);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, AuthParamAndRolesGuard)
  @Put(':comment_id')
  @HttpCode(HttpStatus.OK)
  async updateOne(@AnotherUser() data: paramsAndDto) {
    return this.commentsService.updateOne(data.params, data.dto);
  }
}
