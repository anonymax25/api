import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.repository.find();
  }

  async getUser(id: number): Promise<User> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const salt = bcrypt.genSaltSync(10, 'a');
    const user = new User();
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, salt);
    const created = await this.repository.save(user);
    delete created.password;
    return created;
  }

  async deleteUser(id: number) {
    return this.repository.delete(id);
  }
}
