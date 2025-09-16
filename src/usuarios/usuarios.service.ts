import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usersRepository: Repository<Usuario>,
  ) {}

  async create(Usuario: Usuario): Promise<Usuario> {
    const newUser = this.usersRepository.create(Usuario);

    return await this.usersRepository.save(newUser);
  }

  async findOne(username: string): Promise<Usuario | null> {
    return this.usersRepository.findOne({
      where: { username },
      relations: {
        rol: true,
        perfil: true,
      },
    });
  }

  async findById(id: number): Promise<Usuario | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: {
        rol: true,
        perfil: true,
      },
    });
  }
}
