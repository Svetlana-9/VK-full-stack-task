import {
    Controller,
    Post,
    Body,
    Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService} from './auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Response } from 'express';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

    @Post()
    async newUser(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) : Promise<User> {
        const user = await this.userService.newUser(createUserDto);
        res.header('X-Auth-Token', this.authService.genToken(user.id));
        return user;
    }
}
