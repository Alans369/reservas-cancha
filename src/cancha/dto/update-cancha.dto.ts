import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCanchaDto } from './create-cancha.dto';

export class UpdateCanchaDto extends OmitType(PartialType(CreateCanchaDto), [
  'propetario',
]) {}
