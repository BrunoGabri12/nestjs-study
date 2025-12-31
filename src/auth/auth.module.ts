import { Global, Module, forwardRef } from '@nestjs/common';
import { BcryptService } from './hashing/bcrypt/bcrypt.service';
import { HashingService } from './hashing/hashing.abstract.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth/auth.guard';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  providers: [
    { provide: HashingService, useClass: BcryptService },
    AuthService,
    AuthGuard,
  ],
  imports: [
    forwardRef(() => UserModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [HashingService, AuthGuard, AuthService, JwtModule, ConfigModule],
  controllers: [AuthController],
})
export class AuthModule {}
