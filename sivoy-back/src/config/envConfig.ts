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
  CONTACT_EMAIL,
  MP_ACCESS_TOKEN,
  MP_PUBLIC_KEY,
  URL_LOGIN_FRONT,
  AVATAR_DEFAULT,
  PUBLIC_ID_AVATAR,
} = process.env;
