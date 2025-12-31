import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserDo } from './dto/create-user.dto';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { SimpleCacheInterceptor } from 'src/common/interceptors/simple-cache/simple-cache.interceptor';
import { AuthGuard } from 'src/auth/guard/auth/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
@UseInterceptors(SimpleCacheInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
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
