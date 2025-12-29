import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserDo } from './dto/create-user.dto';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { SimpleCacheInterceptor } from 'src/common/interceptors/simple-cache/simple-cache.interceptor';
import { SERVER_NAME } from 'src/common/constants/server-name.constant';

@Controller('user')
@UseInterceptors(SimpleCacheInterceptor)
export class UserController {
  constructor(
    @Inject(SERVER_NAME)
    private readonly serverName: string,
    private readonly userService: UserService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(`Handling request on server: ${this.serverName}`);
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<PaginatedDto<UserDo>> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }
}
