import { createUserDto } from './../users/dto/user.dto';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';
import * as bcrypt from 'bcrypt';
import { Payload } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: createUserDto) {
    const user = await this.usersService.findByEmail(dto.email);

    const match = bcrypt.compareSync(dto.password, user.password);

    if (!match) {
      throw new UnauthorizedException({
        message: `Пароль не совпадает`,
      });
    }

    const token = await this.createAccessToken(user);
    return this.tokenToCookie(token);
  }

  async registration(dto: createUserDto) {
    const user = await this.usersService.createOne(null, dto);
    const token = await this.createAccessToken(user);
    return this.tokenToCookie(token);
  }

  private createAccessToken(user: User) {
    const payload = new Payload(user.id, user.roles);
    const token = this.jwtService.sign(
      { payload },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.AT_EXPIRE,
      },
    );
    return token;
  }

  private tokenToCookie(token: string) {
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.AT_EXPIRE}`;
  }
}
