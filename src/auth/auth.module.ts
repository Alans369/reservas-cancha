import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RolModule } from 'src/rol/rol.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { PerfilModule } from 'src/perfil/perfil.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    RolModule,
    UsuariosModule,
    PerfilModule,
    JwtModule.register({
      global: true,
      secret: 'nedhednehfnihrfunrfirufjnrfrfjifrhfrfrjfrfihriufhrfj',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
