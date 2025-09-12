import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Rol {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string
}
