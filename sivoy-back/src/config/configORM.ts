import { config } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { Credential } from 'src/entities/credential.entity';
import { Donation } from 'src/entities/donation.entity';
import { Promotion } from 'src/entities/promotion.entity';
import { Provider } from 'src/entities/provider.entity';
import { Review } from 'src/entities/review.entity';
import { Suggestion } from 'src/entities/suggestion.entity';
import { Travel } from 'src/entities/travel.entity';
import { TravelProvider } from 'src/entities/travelProvider.entity';
import { User } from 'src/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Image } from 'src/entities/images.entity';
import { Disability } from 'src/entities/disabilities.entity';

config({ path: '.env' });

const typeORMconfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    Credential,
    Travel,
    Suggestion,
    Review,
    Promotion,
    Donation,
    Provider,
    TravelProvider,
    Image,
    Disability,
  ],
  synchronize: true,
  logging: ['query', 'error'],
  dropSchema: true,
  migrations: ['dist/.migrations/*{.ts,.js}'],
  //! Quitar cuando la aplicación pase a producción
  ssl: { rejectUnauthorized: false },
};

export default registerAs('typeorm', () => typeORMconfig);

export const dbConnection = new DataSource(typeORMconfig as DataSourceOptions);
