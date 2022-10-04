import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly _authService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  async use(req: any, res: any, next: () => void) {
    req.user = await this._authService.authenticate(req.headers.authorization);

    if (!req.user) {
      res.status(HttpStatus.UNAUTHORIZED);
      res.send();
      return;
    }

    next();
  }
}
