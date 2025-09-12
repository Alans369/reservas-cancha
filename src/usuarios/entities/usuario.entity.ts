import { Perfil } from "src/perfil/entities/perfil.entity"
import { Rol } from "src/rol/entities/rol.entity"
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string
    
    @OneToOne(() => Rol)
    @JoinColumn()
    rol: Rol
    
    @OneToOne(() => Perfil)
    @JoinColumn()
    perfil: Perfil
}
