import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { CanchaService } from './cancha.service';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('api/v1/cancha')
export class CanchaController {
  constructor(
    private readonly canchaService: CanchaService,
    private readonly usuarioService: UsuariosService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @Body() createCanchaDto: CreateCanchaDto,
    @Req() req: Request & { UserId?: string },
  ) {
    try {
      const user = await this.usuarioService.findById(
        parseInt(req.UserId as string),
      );

      const cancha: CreateCanchaDto = {
        ...createCanchaDto,
        propetario: user as Usuario,
      };

      return this.canchaService.create(cancha);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'error al  crear la cancha',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(@Req() req: Request & { UserId?: string }) {
    try {
      const user = await this.usuarioService.findById(
        parseInt(req.UserId as string),
      );

      return this.canchaService.findAll(user as Usuario);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'error al  crear la cancha',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/cliente')
  async findAllcliente() {
    try {
      return this.canchaService.findAllcliente();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'error al  crear la cancha',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.canchaService.findOne(+id);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'error al  crear la cancha',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id') id: string,
    @Body() updateCanchaDto: UpdateCanchaDto,
  ) {
    try {
      return await this.canchaService.update(+id, updateCanchaDto);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'error al  crear la cancha',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.canchaService.remove(+id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'error al  crear la cancha',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
