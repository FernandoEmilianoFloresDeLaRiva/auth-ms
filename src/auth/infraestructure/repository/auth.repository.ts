import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserI } from 'src/auth/domain/entities/interfaces/UserI';
import { RegisterDTO } from 'src/auth/domain/dtos/register.dto';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: RegisterDTO): Promise<UserI> {
    try {
      const newUser = await this.userRepository.save(user);
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserByEmail(email: string): Promise<UserI> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllUsers(): Promise<UserI[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
}
