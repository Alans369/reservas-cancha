/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';

import { LoginAuthDto } from './dto/login-auth.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './dto/utils-auth-dto';
//import { AuthResponse } from './dto/utils-auth-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UsuariosService,
  ) {}

  async signIn(LoginAuthDto: LoginAuthDto) {
    const { username, password } = LoginAuthDto;

    const user = await this.userService.findOne(username);
    if (!user) {
      throw new Error('credenciales invalidas');
    }

    if (user?.password !== password) {
      throw new Error('credneciales invalidas');
    }

    return user;
  }

  async generateTokens(user: Usuario): Promise<AuthResponse> {
    console.log('generando token');

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.rol.nombre,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),

      this.jwtService.signAsync(payload, {
        expiresIn: '2h', // refresh token dura 7 días
        secret: process.env.JWT_REFRESH_SECRET, // usa un secreto diferente para más seguridad
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  register(usario: Usuario): Promise<Usuario> {
    return this.userService.create(usario);
  }

  async refreshToken(token: string): Promise<{ access_token: string }> {
    try {
      // Verificar el refresh token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // Eliminamos la fecha de expiración del payload
      delete payload.exp;
      delete payload.iat;

      // Generar nuevo access token
      const newAccessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '60s',
      });

      return {
        access_token: newAccessToken,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
        // Aquí puedes usar error.message, error.stack, etc.
      }

      throw new Error('Invalid refresh token');
    }
  }
}
