import { Injectable } from '@nestjs/common';
import { CryptoService } from '../common/crypto.service';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  constructor(private readonly crypto: CryptoService) {}

  async create(username: string, password: string, roles: string[] = ['user']): Promise<User> {
    const passwordHash = await this.crypto.hashPassword(password);
    const user: User = { id: this.idCounter++, username, passwordHash, roles };
    this.users.push(user);
    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((u) => u.username === username);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }
}
