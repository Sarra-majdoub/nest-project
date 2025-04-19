import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const FromHeader = (headerKey: string) =>
  createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers[headerKey.toLowerCase()];
  })();
