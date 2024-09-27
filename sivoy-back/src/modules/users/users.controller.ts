import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './user.dto';
import { TokenGuard } from 'src/guards/token.guard';

import { Roles } from '../../decorators/roles.decorator';
import { Role } from 'src/helpers/roles.enum.';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';


@ApiTags(`Users`)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(TokenGuard)
  @Get('/')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return await this.userService.updateUser(id, user);
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
