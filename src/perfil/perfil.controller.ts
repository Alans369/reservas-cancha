import { Controller, Get, Body, Put, Param } from '@nestjs/common';
import { PerfilService } from './perfil.service';

import { UpdatePerfilDto } from './dto/update-perfil.dto';

@Controller('api/v1/perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfilService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePerfilDto: UpdatePerfilDto) {
    return this.perfilService.update(+id, updatePerfilDto);
  }
}
