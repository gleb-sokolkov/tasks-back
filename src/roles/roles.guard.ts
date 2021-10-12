import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (roles.length === 0) {
        return true;
      }

      const req = context.switchToHttp().getRequest();

      if (!req.user) {
        throw new UnauthorizedException({
          message: 'Некорректный токен',
        });
      }

      return req.user.roles.some((role) => roles.includes(role.value));
    } catch (ex) {
      throw new ForbiddenException({
        message: 'Доступ запрещен',
      });
    }
  }
}
