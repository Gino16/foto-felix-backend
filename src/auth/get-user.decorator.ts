import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'db/entities/user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
