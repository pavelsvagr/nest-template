import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../auth/decorator/auth.decorator';
import { User } from './entity/user.entity';

@Controller('users')
export class UserController {
  private readonly _userService;

  constructor(userService: UserService) {
    this._userService = userService;
  }

  @Get()
  all() {
    return this._userService.getMore();
  }

  @Get('me')
  me(@Auth() user?: User) {
    return user;
  }

  @Get(':id')
  one(@Param('id') id: string) {
    return this._userService.getOne(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const { id } = await this._userService.create(dto);
    return this._userService.getOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    await this._userService.update(id, dto);
    return this._userService.getOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const user = await this._userService.getOne(id);
    await this._userService.delete(id);
    return user;
  }
}
