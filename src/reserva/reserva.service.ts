import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
  ) {}

  async create(reserva: Omit<Reserva, 'id'>): Promise<Reserva> {
    try {
      const Reserva = this.reservaRepository.create(reserva);
      return await this.reservaRepository.save(Reserva);
    } catch (error) {
      console.log(error);
      throw new Error('error al crear la reserva');
    }
  }

  async findAll(id: number): Promise<Reserva[]> {
    try {
      const reserva2 = await this.reservaRepository.find({
        where:{
          cancha:{
            propetario:{
              id
            }
          }
        },
        relations: {
          cancha:true,
          cliente:true
        }

        
      })

     

      if (!reserva2) {
        return [];
      }

      return reserva2;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('error al obtener las reserva del propietario');
    }
  }

  async findAllcliente(id: number): Promise<Reserva[]> {
    try {
      const reserva = await this.reservaRepository
        .createQueryBuilder()
        .where('Reserva.cliente.id=:id', { id })
        .getMany();

      if (!reserva) {
        return [];
      }

      return reserva;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('error al obtener las reserva del cliente');
    }
  }

  async findOne(id: number): Promise<Reserva | null> {
    try {
      return await this.reservaRepository.findOne({ where: { id } });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('error al obtener las  reservas por id del propietario');
    }
  }

  async update(
    id: number,
    estado: 'pendiente' | 'confirmada' | 'cancelada',
  ): Promise<boolean> {

  
    try {
      const rs = await this.reservaRepository
        .createQueryBuilder()
        .update(Reserva)
        .set({
          estado,
        })
        .where('id = :id', { id })
        .execute();

      return rs.affected != undefined && rs.affected > 0;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('error al obtener al actualizar la reserva');
    }
  }
}
