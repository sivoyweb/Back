import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Credential } from 'src/entities/credential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Credential]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
