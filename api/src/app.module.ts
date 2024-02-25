import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/user-roles';

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      database:'blog_tutorial',
      username:'root',
      password:'123456',
      port: 3306,
      autoLoadEntities:true,
      synchronize:true,

    }),
    CategoryModule,
    AuthModule,
    AccessControlModule.forRoles(roles)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
