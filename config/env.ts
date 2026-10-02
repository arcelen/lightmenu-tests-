import * as dotenv from 'dotenv';

dotenv.config();


function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  
  return value;
}

export const TEST_EMAIL = requireEnv('TEST_EMAIL');
export const TEST_PASSWORD = requireEnv('TEST_PASSWORD');
