import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { LikesModule } from './likes/likes.module';
import { User } from './user/entities/user.entity';
import { Like } from './likes/entities/like.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'cat-pinterest-api-pg',
      port: 5432,
      password: '1',
      username: 'postgres',
      entities: [User, Like],
      database: 'support_lk_db',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    LikesModule,
  ],
})
export class AppModule {}
