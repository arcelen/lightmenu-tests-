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
export const SUPABASE_URL = requireEnv('SUPABASE_URL');
export const SUPABASE_ANON_KEY = requireEnv('SUPABASE_ANON_KEY');

// Second account, owning a different restaurant - used for cross-account
// authorization tests (proving one owner can't touch another's data).
export const TEST_EMAIL_B = requireEnv('TEST_EMAIL_B');
export const TEST_PASSWORD_B = requireEnv('TEST_PASSWORD_B');
