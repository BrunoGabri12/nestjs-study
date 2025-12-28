import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const startDate = new Date();

    return next.handle().pipe(
      tap(() => {
        console.log(
          'Executando',
          context.getClass().name,
          context.getHandler().name,
          'em',
          new Date().getTime() - startDate.getTime(),
          'ms',
        );
      }),
    );
  }
}
