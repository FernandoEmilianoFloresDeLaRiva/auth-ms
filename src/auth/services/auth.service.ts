import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../infraestructure/repository/auth.repository';
import { TokenService } from './token.service';
import { EncryptService } from './encrypt.service';
import { RegisterDTO } from '../domain/dtos/register.dto';
import { RpcException } from '@nestjs/microservices';
import { LoginDTO } from '../domain/dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepository) private readonly authRepository: AuthRepository,
    @Inject(TokenService) private readonly tokenService: TokenService,
    @Inject(EncryptService) private readonly encryptService: EncryptService,
  ) {}

  async registerUser(registerDto: RegisterDTO) {
    const { email, password } = registerDto;
    try {
      const originalUser = await this.authRepository.findUserByEmail(email);
      if (originalUser) {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'User already exists',
        });
      }
      const encryptedPassword =
        await this.encryptService.hashPassword(password);
      const user = await this.authRepository.createUser({
        ...registerDto,
        password: encryptedPassword,
      });
      return user;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async loginUser(loginDto: LoginDTO) {
    const { email, password } = loginDto;
    try {
      const user = await this.authRepository.findUserByEmail(email);
      if (!user) {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'User not found',
        });
      }
      const isPasswordValid = await this.encryptService.comparePassword(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid password',
        });
      }
      const token = await this.tokenService.generateToken({
        id: user.id.toString(),
        email: user.email,
        name: user.username,
      });
      const { password: originalPassword, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token,
      };
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async validateUser(token: string) {
    try {
      return this.tokenService.verifyToken(token);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
