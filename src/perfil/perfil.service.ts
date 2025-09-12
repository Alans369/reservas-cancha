import { Injectable } from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfil } from './entities/perfil.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(Perfil)
    private periflRepository: Repository<Perfil>,
  ) {}

  async create(createPerfilDto: CreatePerfilDto): Promise<Perfil> {
    const perfil = this.periflRepository.create(createPerfilDto);

    return await this.periflRepository.save(perfil);
  }

  async findOne(id: number): Promise<Perfil> {
    const perfil = await this.periflRepository.findOneBy({ id });

    if (!perfil) {
      throw new Error('perfil not found');
    }

    return perfil;
  }

  async update(id: number, updatePerfilDto: UpdatePerfilDto): Promise<Perfil> {
    const perfil = await this.periflRepository.findOneBy({ id });

    if (!perfil) {
      throw new Error('perfil not found');
    }

    this.periflRepository.merge(perfil, updatePerfilDto);

    const result = await this.periflRepository.save(perfil);

    return result;
  }
}
