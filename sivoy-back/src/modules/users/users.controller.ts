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
import { EmailDto, UpdateUserDto } from './user.dto';
import { TokenGuard } from 'src/guards/token.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from 'src/helpers/roles.enum.';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(`Users`)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @UseGuards(TokenGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/make-admin')
  async makeAdmin(@Body() userData: EmailDto) {
    const response = await this.userService.makeAdmin(userData.email);
    return response;
  }

  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return await this.userService.updateUser(id, user);
  }

  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('block/:id')
  async blockUser(@Param('id') id: string) {
    return await this.userService.blockUser(id);
  }

  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('unblock/:id')
  async unblockUser(@Param('id') id: string) {
    return await this.userService.unblockUser(id);
  }
}
