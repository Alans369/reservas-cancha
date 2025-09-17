import { Cancha } from 'src/cancha/entities/cancha.entity';
import { Perfil } from 'src/perfil/entities/perfil.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Rol)
  @JoinColumn()
  rol: Rol;

  @OneToOne(() => Perfil)
  @JoinColumn()
  perfil: Perfil;

  @OneToMany(() => Cancha, (cancha) => cancha.propetario)
  canchas: Cancha[];
}
