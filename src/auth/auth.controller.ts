import { createUserDto } from './../users/dto/user.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Авторизация')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Вход пользователя' })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: createUserDto, @Req() req: Request) {
    const tokenCookie = await this.authService.login(dto);
    req.res.setHeader('Set-Cookie', tokenCookie);
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @Post('/registration')
  @HttpCode(HttpStatus.CREATED)
  async registration(@Body() dto: createUserDto, @Req() req: Request) {
    const tokenCookie = await this.authService.registration(dto);
    req.res.setHeader('Set-Cookie', tokenCookie);
  }
}
