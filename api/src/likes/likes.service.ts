import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {

    constructor(@InjectRepository(Like) private readonly likesRepository: Repository<Like>) { }

    addLike(user: number, createLikeDto: CreateLikeDto) {
        const like: Like = new Like();
        like.user = user;
        like.cat_id = createLikeDto.cat_id;
        like.created_at = createLikeDto.created_at !== undefined ? createLikeDto.created_at : new Date().toString();
        return this.likesRepository.save(like);
    }

    getLikes(user: number) {
        return this.likesRepository.findBy({
            user: user
        });
    }

    delLike(user: number, cat_id: string) {
        return this.likesRepository.delete({
            user: user,
            cat_id: cat_id
        });
    }
}
