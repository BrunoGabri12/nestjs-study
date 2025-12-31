import { registerAs } from '@nestjs/config';

//Isso poderia ir para o modulo de configuração geral da aplicação também
export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  jwtTtl: process.env.JWT_TTL,
  jwtRefreshSecret: process.env.JWT_SECRET_REFRESH,
  jwtRefreshTtl: process.env.JWT_TTL_REFRESH,
}));
