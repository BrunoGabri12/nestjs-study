import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class MyExceptionFilterFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
  }
}
