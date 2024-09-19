import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "src/entities/user.entity";
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}
    
    getAllUsers() {
        return "All Users"
    }

    getUserById(id: string) {
        return "User by Id"
    }

    updateUser(id: string, user: User) {
        return "User Updated"
    }

    createUSer(user: User) {
        return "User Created"
    }

    deleteUser(id: string) {
        return "User Deleted"
    }

    blockUser(id: string) {
        return "User Blocked"
    }

    unblockUser(id: string) {
        return "User Unblocked"
    }
}