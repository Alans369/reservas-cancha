import { type Disponibilidad } from '../../helper/helper';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cancha {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.canchas)
  @JoinColumn()
  propetario: Usuario;

  @Column()
  nombre_cancha: string;

  @Column()
  imagen: string;

  @Column()
  direccion: string;

  @Column()
  precio_x_hora: string;

  @Column()
  tipo_cancha: string;

  @Column('json')
  disponibilidad_horarios: Disponibilidad;

  @Column({ default: true })
  estado: boolean;

  @Column({ default: true })
  activa: boolean;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Reserva, (reserva) => reserva.cancha)
  reservas: Reserva[];
}
