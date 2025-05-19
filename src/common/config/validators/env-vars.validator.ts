import * as joi from 'joi';
import { EnvVarsI } from '../entities/interfaces/EnvVarsI';

export const EnvVarsValidator = joi.object<EnvVarsI>({
  PORT: joi.number().required(),
  JWT_SECRET: joi.string().required(),
  SALTS_JUMP: joi.number().required(),
  DB_NAME: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_HOST: joi.string().required(),
}).unknown(true);
