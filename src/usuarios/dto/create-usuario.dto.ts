import { PickType } from '@nestjs/mapped-types';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';

export class CreateUsuarioDto extends PickType(CreateAuthDto, [
  'username',
  'email',
  'password',
  'rol',
]) {}
