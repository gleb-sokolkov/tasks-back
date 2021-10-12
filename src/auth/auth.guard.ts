import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const header = req.headers.authorization;
      const type = header.split(' ')[0];
      const token = header.split(' ')[1];

      if (type !== 'Bearer' && !token) {
        throw new UnauthorizedException({
          message: 'Некорректный токен',
        });
      }

      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      req.user = user;
      return true;
    } catch (ex) {
      throw new UnauthorizedException({
        message: 'Некорректный токен',
      });
    }
  }
}
