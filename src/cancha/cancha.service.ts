import { Injectable } from '@nestjs/common';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancha } from './entities/cancha.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { error } from 'console';

@Injectable()
export class CanchaService {
  constructor(
    @InjectRepository(Cancha)
    private canchaRepository: Repository<Cancha>,
  ) {}

  async create(createCanchaDto: CreateCanchaDto): Promise<Cancha> {
    try {
      const cancha = this.canchaRepository.create(createCanchaDto);
      return this.canchaRepository.save(cancha);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('error al guardar la cancha');
    }
  }

  async findAll(usuario: Usuario,page:number,pageSize:number): Promise<{data:Cancha[],total:number}> {
    try {
     /* const canchas = await this.canchaRepository.find({
        where: { propetario: usuario, activa: true },
        relations: {
          propetario: true,
        },
      });*/

      const [result,total]  = await this.canchaRepository
      .createQueryBuilder()
      .where("Cancha.propetario.id =:id",{id:usuario.id})
      .skip((page - 1) * pageSize)
              .take(pageSize)
              .getManyAndCount();

      if (total==0) {
        return {data:[],total:0};
      }

      return {data:result,total};
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('error al obtener las cnchas');
    }
  }

  async findAllcliente(): Promise<Cancha[]> {
    try {
      const canchas = await this.canchaRepository.find({
        where: { activa: true },
        relations: {
          propetario: true,
        },
      });

      if (!canchas) {
        return [];
      }

      return canchas;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('error al obtener las cnchas');
    }
  }

  async findOne(id: number): Promise<Cancha | null> {
    try {
      return this.canchaRepository.findOne({ where: { id, activa: true } });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('error al obtener las cnchas');
    }
  }

  async update(id: number, updateCanchaDto: UpdateCanchaDto): Promise<Cancha> {
    try {
      const cancha = await this.canchaRepository.findOne({ where: { id } });

      if (!cancha) {
        throw new error('cancha no encontrada');
      }
      const newcancha = this.canchaRepository.merge(cancha, updateCanchaDto);

      return await this.canchaRepository.save(newcancha);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('error al obtener las cnchas');
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const cancha = await this.canchaRepository.findOne({
        where: { id, activa: true },
      });

      if (!cancha) {
        throw new error('cancha no encontrada');
      }

      const rs = await this.canchaRepository
        .createQueryBuilder()
        .update(Cancha)
        .set({ activa: false })
        .where('id =:id', { id })
        .execute();

      return rs.affected != undefined && rs.affected > 0;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('error al borrar la cancha');
    }
  }
}
