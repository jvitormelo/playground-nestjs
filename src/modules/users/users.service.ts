import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

interface FindOneParams {
  id?: number;
  email?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (e) {
      console.log(e);
      if (e.code === '23505') {
        // TODO achar o melhor jeito de tratar as execessoes
        throw new ConflictException('Email already exist');
      }
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(params: FindOneParams) {
    const user = await this.userRepository.findOne({ where: params });

    // TODO ver com alguem que sabe
    if (!user) throw new BadRequestException('Usuário não encontrado');
    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.create(updateUserDto);
    // TODO quando atualizar com email unico esta dando erro, criar tratativa global
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
