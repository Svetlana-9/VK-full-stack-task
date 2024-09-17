import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Like } from './entities/like.entity';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports: [TypeOrmModule.forFeature([Like]), UserModule],
})
export class LikesModule {}
