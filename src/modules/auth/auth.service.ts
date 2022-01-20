import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne({ email });

    if (!user) throw new BadRequestException('Usuário não encontrado');

    // TODO criptografia
    if (user.password !== password) {
      throw new UnauthorizedException('Dados inválidos');
    }

    delete user.password;
    return user;
  }

  async login(user: User) {
    return {
      user,
      token: this.jwtService.sign({ ...user }),
    };
  }
}
