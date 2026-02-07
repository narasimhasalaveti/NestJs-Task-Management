import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, cxt: ExecutionContext): User => {
    const req = cxt?.switchToHttp()?.getRequest<{ user: User }>();
    return req.user;
  },
);
