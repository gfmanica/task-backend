import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = Number(
      this.configService.get<number>('JWT_EXPIRATION_TIME'),
    );
  }

  signIn(username: string, password: string): AuthResponseDto {
    const user = this.userService.findOne(username);

    if (!user || !bcryptCompareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { username: user.username, sub: user.id };

    const token = this.jwtService.sign(payload);

    return {
      token,
      expiresIn: this.jwtExpirationTimeInSeconds,
    };
  }
}
