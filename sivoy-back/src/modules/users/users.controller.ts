import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(`Users`)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: User) {
    return await this.userService.updateUser(id, user);
  }

  @Post()
  async createUSer(@Body() user: CreateUserDto) {
    const emailUsed = await this.userService.isEmailInUse(user.email);

    if (emailUsed) {
      throw new HttpException(
        { status: 400, error: 'email already in use' },
        400,
      );
    }
    return await this.userService.createUSer(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Put('block/:id')
  async blockUser(@Param('id') id: string) {
    return await this.userService.blockUser(id);
  }

  @Put('unblock/:id')
  async unblockUser(@Param('id') id: string) {
    return await this.userService.unblockUser(id);
  }
}

