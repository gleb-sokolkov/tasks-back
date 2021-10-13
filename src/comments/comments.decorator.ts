import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AnotherUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    req.params.user = req.user.id.toString();
    return { dto: req.body, params: req.params };
  },
);
