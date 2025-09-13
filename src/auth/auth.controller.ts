import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RolService } from 'src/rol/rol.service';
import { Rol } from 'src/rol/entities/rol.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { PerfilService } from 'src/perfil/perfil.service';
import { Perfil } from 'src/perfil/entities/perfil.entity';

//Hago este comentario porque me aparecio el comit en jira se abia tardado mucho en aparecerer

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly rolService: RolService,
    private readonly perfilService: PerfilService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('/login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    try {
      const usario = await this.authService.signIn(loginAuthDto);

      const result = await this.authService.generateTokens(usario);

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        // Aquí puedes usar error.message, error.stack, etc.
      }
      throw new HttpException('error en rol', HttpStatus.BAD_REQUEST);
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('/register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    const usuario = new Usuario();
    usuario.username = createAuthDto.username;
    usuario.email = createAuthDto.email;
    usuario.password = createAuthDto.password;
    const neWperfil = new Perfil();
    neWperfil.nombre = createAuthDto.nombre;
    neWperfil.apellido = createAuthDto.apellido;
    neWperfil.telefono = createAuthDto.telefono;

    try {
      const rol: Rol = await this.rolService.findById(createAuthDto.rol);

      usuario.rol = rol;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        // Aquí puedes usar error.message, error.stack, etc.
      }
      throw new HttpException('error en rol', HttpStatus.BAD_REQUEST);
    }

    try {
      const perfil: Perfil = await this.perfilService.create(neWperfil);

      usuario.perfil = perfil;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
        // Aquí puedes usar error.message, error.stack, etc.
      }
      throw new HttpException('error en rol', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return await this.authService.register(usuario);
  }

  @Post('/refresh')
  refreshToken(@Body() token: string) {
    try {
      return this.authService.refreshToken(token);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        // Aquí puedes usar error.message, error.stack, etc.
      }
      throw new HttpException('error en rol', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
