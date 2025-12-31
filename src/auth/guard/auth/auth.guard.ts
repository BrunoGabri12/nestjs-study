import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';

//Já existe um guard de autenticação no nestjs/passport. Sempre que possível, usar o que já existe.

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguraton: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = this.extractTokenFromHeader(authHeader);
    console.log('Token extraído do cabeçalho:', token);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const result = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguraton,
      );
      console.log('Token validado com sucesso:', result);
    } catch (err) {
      console.error('Erro ao validar token:', err);
      throw new UnauthorizedException();
    }

    console.log('Autenticação bem-sucedida para o token:', token);
    return true;
  }

  extractTokenFromHeader(header: string): string | null {
    if (!header) {
      return null;
    }
    const [type, token] = header.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
