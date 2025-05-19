import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthRepository } from './repository/auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthRepository],
  exports: [AuthRepository],
})
export class AuthModule {}
