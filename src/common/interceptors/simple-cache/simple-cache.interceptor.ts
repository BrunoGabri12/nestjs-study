import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map<string, any>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const key = request.originalUrl;
    console.log('Intercepting request for key:', key);

    if (this.cache.has(key)) {
      console.log('Cache hit for key:', key);
      return this.cache.get(key);
    } else {
      console.log('Cache miss for key:', key);
      const response$ = next.handle();
      this.cache.set(key, response$);
      return response$;
    }
  }
}
