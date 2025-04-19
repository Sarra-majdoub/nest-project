import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: 'votre_secret_jwt',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthMiddleware],
  exports: [JwtModule],
})
export class AuthModule {}