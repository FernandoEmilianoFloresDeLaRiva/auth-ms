import 'dotenv/config';
import { EnvVarsValidator } from './validators/env-vars.validator';
import { EnvVarsI } from './entities/interfaces/EnvVarsI';

const getEnvs = () => {
  const { error, value } = EnvVarsValidator.validate({
    ...process.env,
  });
  if (error) {
    throw new Error(`Error getting envs: ${error.message}`);
  }

  const envs: EnvVarsI = value;
  return envs;
};

export const envsValues = getEnvs();
