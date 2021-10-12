import { UsersModule } from './../users/users.module';
import { AuthController } from './auth.controller';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({}),
    SequelizeModule.forFeature([User]),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
