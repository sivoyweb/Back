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
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  MP_ACCESS_TOKEN,
  MP_PUBLIC_KEY,
} = process.env;
