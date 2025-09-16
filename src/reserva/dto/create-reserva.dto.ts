import { IsNotEmpty } from 'class-validator';

export class CreateReservaDto {
  @IsNotEmpty()
  canchaId: number;
  @IsNotEmpty()
  fecha_reserva: Date;
  @IsNotEmpty()
  hora_inicio: string;
  @IsNotEmpty()
  hora_fin: string;
  @IsNotEmpty()
  precio_total: number;
  @IsNotEmpty()
  estado: string;
  @IsNotEmpty()
  fecha_solicitud: Date;
  @IsNotEmpty()
  fecha_confirmacion: Date;
}
