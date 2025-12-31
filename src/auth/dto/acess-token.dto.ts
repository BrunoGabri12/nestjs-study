import { IsNotEmpty } from 'class-validator';

export class AcessTokenDto {
  @IsNotEmpty()
  accessToken: string;
  @IsNotEmpty()
  refreshToken: string;
}
