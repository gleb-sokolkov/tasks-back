import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/roles/roles.decorator';

@Injectable()
export class AuthParamGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (!req.user) {
      throw new UnauthorizedException({
        message: 'Некорректный токен',
      });
    }

    return req.user.id === parseInt(req.params.user_id);
  }
}

@Injectable()
export class AuthParamAndRolesGuard
  extends AuthParamGuard
  implements CanActivate
{
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
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

      const hasRole = req.user.roles.some((role) => roles.includes(role.value));

      return super.canActivate(context) || hasRole;
    } catch (ex) {
      throw new ForbiddenException({
        message: 'Доступ запрещен',
      });
    }
  }
}
