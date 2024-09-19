import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private readonly UsersRepository: UsersRepository) {}
    
    getAllUsers() {
        return this.UsersRepository.getAllUsers()
    }

    getUserById(id: string) {
        return this.UsersRepository.getUserById(id)
    }

    updateUser(id: string, user: User) {
        return this.UsersRepository.updateUser(id, user)
    }

    createUSer(user: User) {
        return this.UsersRepository.createUSer(user)
    }

    deleteUser(id: string) {
        return this.UsersRepository.deleteUser(id)
    }

    blockUser(id: string) {
        return this.UsersRepository.blockUser(id)
    }

    unblockUser(id: string) {
        return this.UsersRepository.unblockUser(id)
    }
}
