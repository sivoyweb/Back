import { config } from 'dotenv';

config({ path: '.env' });

export const {
  DB_HOST,
  DB_PORT,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  DB_NAME,
  JWT_SECRET,
  USER_EMAIL,
  PASS_EMAIL,
} = process.env;
