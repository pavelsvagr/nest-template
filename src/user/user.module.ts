import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
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
