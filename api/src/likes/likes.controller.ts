import { Controller, Get, Post, Body, Request, Param, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { AuthService } from '../user/auth/auth.service';

@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService, private readonly authService: AuthService) { }

    @Post()
    addLike(@Request() req, @Body() createLikeDto: CreateLikeDto) {
        this.authService.checkAuth(req);
        return this.likesService.addLike(req.user, createLikeDto);
    }

    @Get()
    getLikes(@Request() req) {
        this.authService.checkAuth(req);
        return this.likesService.getLikes(req.user);
    }

    @Delete(':cat_id')
    delLike(@Request() req, @Param('cat_id') cat_id: string) {
        this.authService.checkAuth(req);
        return this.likesService.delLike(req.user, cat_id);
    }
}
