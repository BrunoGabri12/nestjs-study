import { UserDo } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toDto(user: User): UserDo {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
