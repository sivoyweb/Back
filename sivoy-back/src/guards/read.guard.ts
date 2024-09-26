import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config/envConfig';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class ReadGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const token = req.headers['authorization']?.split(' ')[1] ?? '';

      // Si no hay token, permitir acceso
      if (!token) {
        return true;
      }

      // Verificar el token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET,
      });

      if (payload) {
        // Obtener el usuario correspondiente al payload
        const userFound = await this.userService.getUserById(payload.id);

        if (userFound?.userWithoutPassword) {
          // Asignar el usuario encontrado al req.user
          const { id, role } = userFound.userWithoutPassword;
          req.user = { id, role };
          console.log(req.user);
          
        }
      }

      return true; // Permitir el acceso incluso si no hay usuario autenticado
    } catch (err) {
      // Si ocurre un error (token inválido, etc.), permitir el acceso
      return true;
    }
  }
}
  