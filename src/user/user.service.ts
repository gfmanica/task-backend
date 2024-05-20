import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UserService {
  private readonly users: UserDto[] = [];

  create(user: UserDto): void {
    user.id = uuid();
    user.password = bcryptHashSync(user.password, 10);

    this.users.push(user);
  }

  findOne(username: string): UserDto | null {
    return this.users.find((user) => user.username === username) || null;
  }
}
