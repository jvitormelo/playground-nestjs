import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

export const globalAuthConfig = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};
