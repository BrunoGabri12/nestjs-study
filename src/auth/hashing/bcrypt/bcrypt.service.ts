import { Injectable } from '@nestjs/common';
import { HashingService } from '../hashing.abstract.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService extends HashingService {
  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }
  async compare(data: string, hashedData: string): Promise<boolean> {
    return await bcrypt.compare(data, hashedData);
  }
}
