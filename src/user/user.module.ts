import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserService,
    {
      provide: 'UserProvider',
      useClass: UserService,
    },
    UserRepository,
  ],
  controllers: [UserController],
  exports: ['UserProvider'],
})
export class UserModule {}
