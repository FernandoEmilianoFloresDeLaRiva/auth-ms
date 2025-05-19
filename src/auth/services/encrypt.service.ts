import { Injectable } from '@nestjs/common';
import { envsValues } from 'src/common/config/get-envs-values';
import { genSalt, hashSync, compareSync } from 'bcrypt';

@Injectable()
export class EncryptService {
  private readonly saltRounds = envsValues.SALTS_JUMP;

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.saltRounds);
    return hashSync(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return compareSync(password, hash);
  }
}
