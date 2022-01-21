import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { checkHash } from '../../common/utils/hash.util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // TODO melhorar feedback
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne({ email });

    const isMatch = await checkHash(password, user.password);

    if (!isMatch) {
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
