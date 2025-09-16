import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { CanchaModule } from 'src/cancha/cancha.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva]), UsuariosModule, CanchaModule],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
