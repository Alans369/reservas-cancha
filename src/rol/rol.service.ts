import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  async findAll(): Promise<Rol[]> {
    return await this.rolRepository.find();
  }

  async findById(id: number): Promise<Rol> {
    const rl = await this.rolRepository.findOneBy({ id });

    if (!rl) {
      throw new Error('category not found');
    }

    return rl;
  }
}
