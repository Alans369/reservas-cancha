import { Controller, Get, Body, Put, Param, Post, Req } from '@nestjs/common';
import { PerfilService } from './perfil.service';

import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('api/v1/perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Get('')
  findOne(@Req() req: Request & { UserId?: string }) {
    return this.perfilService.findOne(parseInt(req.UserId as string));
  }

  @Post()
  update(@Body() updatePerfilDto: UpdatePerfilDto, @Req() req: Request & { UserId?: string }){
    return this.perfilService.update(parseInt(req.UserId as string ), updatePerfilDto);
  }
}
