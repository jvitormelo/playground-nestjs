import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserRequest {
  id: number;
}

export const UserRequest = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
