import { Controller, Get, Body, Put, Param, Post, Req } from '@nestjs/common';
import { PerfilService } from './perfil.service';

import { UpdatePerfilDto } from './dto/update-perfil.dto';

@Controller('api/v1/perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfilService.findOne(+id);
  }

  @Post()
  update(@Body() updatePerfilDto: UpdatePerfilDto, @Req() req: Request & { UserId?: string }){
    return this.perfilService.update(parseInt(req.UserId as string ), updatePerfilDto);
  }
}
