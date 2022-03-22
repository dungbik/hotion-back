import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SignInInput, SignInOutput } from './dtos/sign-in.dto';
import { SignUpInput, SignUpOutput } from './dtos/sign-up.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
  ) {}

  async users() {
    return [];
  }

  async signUp({
    username,
    email,
    password,
  }: SignUpInput): Promise<SignUpOutput> {
    try {
      const exUser = await this.userRepository.findOne({ where: { email } });
      if (exUser) {
        return { ok: false, error: '이미 사용중인 이메일입니다.' };
      }
      const user = await this.userRepository.save(
        this.userRepository.create({ username, email, password }),
      );
      return { ok: true };
    } catch (e) {
      return { ok: false, error: '회원가입 중 문제가 발생했습니다.' };
    }
  }

  async signIn({ email, password }: SignInInput): Promise<SignInOutput> {
    try {
      const exUser = await this.userRepository.findOne({
        where: { email },
      });
      if (!exUser) {
        return {
          ok: false,
          error: '존재하지 않는 이메일입니다.',
        };
      }

      const loginSuccess = await exUser.checkPassword(password);
      if (!loginSuccess)
        return {
          ok: false,
          error: '비밀번호가 틀렸습니다.',
        };

      const token: string = await firstValueFrom(
        this.authService.send('create_token', exUser.id),
      );

      if (token.length == 0) throw new UnauthorizedException();

      return { ok: true, token };
    } catch (e) {
      console.log(e);
      return { ok: false, error: '로그인 중 문제가 발생했습니다.' };
    }
  }

  async findOneById(userId: number) {
    return await this.userRepository
      .createQueryBuilder('user')
      .select('user.id', 'id')
      .addSelect('user.username', 'username')
      .addSelect('user.email', 'email')
      .addSelect('user.grade', 'grade')
      .where('user.id = :id', { id: userId })
      .getRawOne();
  }

  async findByIds(userIds: number[]) {
    return await this.userRepository
      .createQueryBuilder('user')
      .select('user.id', 'id')
      .addSelect('user.username', 'username')
      .addSelect('user.email', 'email')
      .addSelect('user.grade', 'grade')
      .whereInIds(userIds)
      .getRawMany();
  }
}
