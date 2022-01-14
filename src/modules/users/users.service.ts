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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      console.log('chamou');
      return await this.userRepository.save(createUserDto);
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

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    // TODO ver com alguem que sabe
    if (!user) throw new BadRequestException();
    return user;
  }

  update(updateUserDto: UpdateUserDto) {
    // TODO quando atualizar com email unico esta dando erro, criar tratativa global
    return this.userRepository.save(updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
