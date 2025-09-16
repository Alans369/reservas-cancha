import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Cancha } from 'src/cancha/entities/cancha.entity';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cancha, (cancha) => cancha.reservas)
  cancha: Cancha;

  @ManyToOne(() => Usuario)
  @JoinColumn()
  cliente: Usuario;

  @Column()
  fecha_reserva: Date;

  @Column({ type: 'time' })
  hora_inicio: string;

  @Column({ type: 'time' })
  hora_fin: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_total: number;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'confirmada', 'cancelada'],
    default: 'pendiente',
  })
  estado: string;

  @UpdateDateColumn()
  fecha_solicitud: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_confirmacion: Date;
}
