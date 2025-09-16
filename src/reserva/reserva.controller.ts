import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CanchaService } from 'src/cancha/cancha.service';
import { Cancha } from 'src/cancha/entities/cancha.entity';
import { Reserva } from './entities/reserva.entity';
import { Roles } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('/api/v1/reserva')
export class ReservaController {
  constructor(
    private readonly reservaService: ReservaService,
    private readonly userService: UsuariosService,
    private readonly canchaService: CanchaService,
  ) {}

  @Post()
  @Roles(['CLIENTE'])
  @UseGuards(RoleGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createReservaDto: CreateReservaDto,
    @Req() req: Request & { UserId?: string },
  ) {
    try {
      const Cliente = await this.userService.findById(
        parseInt(req.UserId as string),
      );

      const cancha = await this.canchaService.findOne(
        createReservaDto.canchaId,
      );

      const reserva: Omit<Reserva, 'id'> = {
        ...createReservaDto,
        cliente: Cliente as Usuario,
        cancha: cancha as Cancha,
      };

      return await this.reservaService.create(reserva);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'errro al crear la reseerva',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @Roles(['ADMIN'])
  @UseGuards(RoleGuard)
  async findAll(@Req() req: Request & { UserId?: string }) {
    try {
      return this.reservaService.findAll(parseInt(req.UserId as string));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'errro al obtener la reserva la reseerva',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Roles(['CLIENTE'])
  @UseGuards(RoleGuard)
  @Get('/cliente')
  async findAllcliente(@Req() req: Request & { UserId?: string }) {
    try {
      return this.reservaService.findAllcliente(parseInt(req.UserId as string));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'errro al obtner la reserva',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Roles(['CLIENTE'])
  @UseGuards(RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.reservaService.findOne(+id);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'errro al obtner la reserva',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Roles(['ADMIN'])
  @UseGuards(RoleGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: { estado: 'pendiente' | 'confirmada' | 'cancelada' },
  ) {
    try {
      console.log(id, data.estado);
      return this.reservaService.update(+id, data.estado);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'errro al obtner la reserva',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
