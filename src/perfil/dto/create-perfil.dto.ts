import { PickType } from '@nestjs/mapped-types';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';

export class CreatePerfilDto extends PickType(CreateAuthDto, [
  'nombre',
  'apellido',
  'telefono',
]) {}
