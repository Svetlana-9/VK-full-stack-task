import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { createHash } from 'node:crypto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>)
    { }

    async newUser(createUserDto: CreateUserDto): Promise<User> {
        const user: User = new User();
        user.login = createUserDto.login;
        user.password = createHash('sha256').update(createUserDto.password).digest('hex');
        const res = await this.userRepository.findOneBy({login: createUserDto.login});
        if (res)
        {
            if (res.password != user.password)
                throw new UnauthorizedException("such login already exists");
            return res;
        }
        return this.userRepository.save(user);
    }
}
