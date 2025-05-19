import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDTO } from 'src/auth/domain/dtos/login.dto';
import { RegisterDTO } from 'src/auth/domain/dtos/register.dto';
import { AuthService } from 'src/auth/services/auth.service';

@Controller()
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth.healthcheck' })
  async healthCheck() {
    return {
      status: 'ok',
      message: 'Auth service is running',
    }
  }

  @MessagePattern({ cmd: 'auth.register.user' })
  async registerUser(@Payload() registerDto: RegisterDTO) {
    return this.authService.registerUser(registerDto);
  }

  @MessagePattern({ cmd: 'auth.login.user' })
  async loginUser(@Payload() loginDto: LoginDTO) {
    return this.authService.loginUser(loginDto);
  }

  @MessagePattern({ cmd: 'auth.validate.user' })
  async validateUser(@Payload() token: string) {
    return this.authService.validateUser(token);
  }
}
