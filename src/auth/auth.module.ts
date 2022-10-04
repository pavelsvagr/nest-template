import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthMiddleware } from './auth.middleware';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [UserModule, ConfigModule],
  providers: [AuthService, AuthMiddleware],
  exports: [AuthMiddleware, AuthService],
})
export class AuthModule {}
