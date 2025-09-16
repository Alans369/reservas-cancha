import { Controller, Get, Req } from '@nestjs/common';
import { RolService } from './rol.service';
import { type Request } from 'express';

@Controller('api/v1/rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Get()
  findAll(@Req() req: Request & { UserId?: string }) {
    console.log('usario', req.UserId);
    return this.rolService.findAll();
  }
}
