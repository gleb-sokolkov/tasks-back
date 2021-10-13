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
import {
  createCommentDto,
  findOneParams,
  paramsAndDto,
} from './dto/comments.dto';
import { AnotherUser } from './comments.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get(':comment_id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param() params: findOneParams) {
    return this.commentsService.findOne(params);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Param() params: findOneParams) {
    return this.commentsService.findAll(params);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOneByAnother(@AnotherUser() data: paramsAndDto) {
    return this.commentsService.createOne(data.params, data.dto);
  }

  @Delete(':comment_id')
  @HttpCode(HttpStatus.OK)
  async deleteOne(@Param() params: findOneParams) {
    return this.commentsService.deleteOne(params);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteAll(@Param() params: findOneParams) {
    return this.commentsService.deleteAll(params);
  }

  @Put(':comment_id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param() params: findOneParams,
    @Body() dto: createCommentDto,
  ) {
    return this.commentsService.updateOne(params, dto);
  }
}
