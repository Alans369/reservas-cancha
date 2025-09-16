import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Perfil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  telefono: string;
}
