import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Credential } from 'src/entities/credential.entity';
import { DisabilitiesModule } from '../disabilities/disabilities.module';
import { Disability } from 'src/entities/disabilities.entity';
import { Image } from 'src/entities/images.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Credential, Disability, Image]),
    forwardRef(() => DisabilitiesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
