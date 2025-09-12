import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  username: string;
  
  @IsString()
  @IsNotEmpty()
  telefono: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  @IsString()
  @IsNotEmpty()
  rol: number;

  
}
