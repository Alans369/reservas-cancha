import { IsNotEmpty } from 'class-validator';
import { type Disponibilidad } from 'src/helper/helper';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

export class CreateCanchaDto {
  propetario: Usuario;

  @IsNotEmpty()
  nombre_cancha: string;

  @IsNotEmpty()
  imagen: string;

  @IsNotEmpty()
  direccion: string;

  @IsNotEmpty()
  precio_x_hora: string;

  @IsNotEmpty()
  tipo_cancha: string;

  @IsNotEmpty()
  disponibilidad_horarios: Disponibilidad;

  @IsNotEmpty()
  estado: boolean;
}
