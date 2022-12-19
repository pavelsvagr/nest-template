import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthMiddleware } from './auth.middleware';
import { ConfigModule } from '../config/config.module';
import { MeGuard } from './guard/me.guard';

@Module({
  imports: [forwardRef(() => UserModule), ConfigModule],
  providers: [AuthService, AuthMiddleware, MeGuard],
  exports: [AuthMiddleware, AuthService],
})
export class AuthModule {}
