import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { HashingService } from './hashing/hashing.abstract.service';
import { JwtService } from '@nestjs/jwt';
import { AcessTokenDto } from './dto/acess-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AcessTokenDto> {
    const user = await this.userService.getReferenceByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const sucess = await this.hashingService.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!sucess) {
      throw new NotFoundException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    const refreshToken = this.jwtService.sign({
      sub: user.id,
    });

    const accessTokenByUser = new AcessTokenDto();
    accessTokenByUser.accessToken = accessToken;
    accessTokenByUser.refreshToken = refreshToken;

    return accessTokenByUser;
  }

  async logout(): Promise<{ message: string }> {
    return { message: 'Logout successful' };
  }
}
