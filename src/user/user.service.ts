import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UserDo } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { UserMapper } from './mapper/user.mapper';


/* 
Scope.DEFAULT -> Singleton (uma vez instanciado, permanece na memoria ate o fim da aplicacao)
Scope.REQUEST -> Instancia a cada requisicao (uma nova instancia para cada requisicao)
Scope.TRANSIENT -> Cada classe injetada recebe uma nova instancia da classe (mesmo dentro da mesma requisicao)


*/


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (findUser) {
      throw new ForbiddenException();
    }

    return this.userRepository.save({
      username: createUserDto.username,
      email: createUserDto.email,
      passwordHash: createUserDto.password,
    });
  }

  async findAll(): Promise<PaginatedDto<UserDo>> {
    const [users, totalCount] = await this.userRepository.findAndCount();

    return { items: users.map((user) => UserMapper.toDto(user)), totalCount };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }
    return UserMapper.toDto(user);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException();
    }

    return UserMapper.toDto(user);
  }

  async delete(id: string) {
    const result = await this.userRepository.delete({ id });
  }

  async existsById(id: string): Promise<boolean> {
    const exists = await this.userRepository.exists({ where: { id } });
    if (!exists) {
      throw new NotFoundException();
    }

    return exists;
  }

  getReferenceById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  getReferenceByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }
}
