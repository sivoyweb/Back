import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
    constructor (private readonly userService: UsersService) {}

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers()
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id)
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() user: User) {
        return this.userService.updateUser(id, user)
    }

    @Post()
    createUSer(@Body() user: User) {
        return this.userService.createUSer(user)
    }

    @Delete(':id') 
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }

    @Put('block/:id')
    blockUser(@Param('id') id: string) {
        return this.userService.blockUser(id)
    }

    @Put('unblock/:id')
    unblockUser(@Param('id') id: string) {
        return this.userService.unblockUser(id)
    }

    
}
