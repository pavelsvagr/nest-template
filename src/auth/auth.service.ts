import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import UserProvider from './interface/user.provider.interface';

@Injectable()
export class AuthService {
  private readonly _userService;
  private readonly _configService;

  constructor(
    configService: ConfigService,
    @Inject('UserProvider') userService: UserProvider,
  ) {
    this._userService = userService;
    this._configService = configService;
  }

  static getBearerToken(authorizationHeader?: string) {
    const [bearer, accessToken] = (authorizationHeader ?? '').split(' ');
    if (!bearer || bearer.toLowerCase() !== 'bearer') {
      return;
    }
    return accessToken;
  }

  authenticate(auth: string) {
    const token = AuthService.getBearerToken(auth);

    if (
      this._configService.config.auth.directBearerAuth &&
      token?.startsWith('U_')
    ) {
      return this._userService.getOne(token.split('_')[1]);
    }

    //todo implement not direct bearer method

    return Promise.resolve(undefined);
  }
}
