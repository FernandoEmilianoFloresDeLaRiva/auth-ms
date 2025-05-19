import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthRepository } from './repository/auth.repository';
import { AuthService } from '../services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { envsValues } from 'src/common/config/get-envs-values';
import { EncryptService } from '../services/encrypt.service';
import { TokenService } from '../services/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: envsValues.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthRepository, AuthService, EncryptService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
