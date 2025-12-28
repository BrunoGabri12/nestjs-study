//Vem antes da execução do interceptor
//acesso bruto ao request e response

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    return res.status(403).send('Forbidden by simple middleware');
  }
}
