import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerfilModule } from './perfil/perfil.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { AuthModule } from './auth/auth.module';
import { CanchaModule } from './cancha/cancha.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-test-esfe-8ff0.b.aivencloud.com',
      port: 20787,
      username: 'avnadmin',
      password: 'AVNS_PfxZhqEHsyFEn50ylaO',
      database: 'TiendaOnline',
      logging: true,
      synchronize: false,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    PerfilModule,
    UsuariosModule,
    RolModule,
    AuthModule,
    CanchaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
