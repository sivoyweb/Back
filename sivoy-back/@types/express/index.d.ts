import { User } from 'src/entities/user.entity'; // Asegúrate de que esta ruta es correcta.

declare module 'express' {
  interface Request {
    user?: User; // Declara que la propiedad 'user' puede estar en Request y es opcional
  }
}