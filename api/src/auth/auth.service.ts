import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>,
              private jwtService : JwtService){

  }
  async login(loginDto: UserLoginDto){
    console.log(loginDto);
    const user = await 
                      this.repo.createQueryBuilder('user')
                      .addSelect('user.password')
                      .where('user.email = :email',{email:loginDto.email}).getOne();

    if(!user){
      throw new UnauthorizedException('Bad credentials');
    }else{
      //verify that the supplied password hash is matching with the password hash in database
      if(await this.verifyPassword(loginDto.password,user.password)){
        const token = await this.jwtService.signAsync({
          email: user.email,
          id: user.id
        });
        delete user.password;
        return { token, user };
      }else{
        throw new UnauthorizedException('Bad credentials');
      }
    }

  }

  async verifyPassword(password:string,hash:string){
    return await bcrypt.compare(password,hash);
  }

  async register(createUserDto:CreateAuthDto){
    const {email} = createUserDto;

    const checkForUser = await this.repo.findOne({ where: { email } });

    if(checkForUser){
      throw new BadRequestException('Email is already chosen,please choose a new one');
    }else{
      const user = new User();
      Object.assign(user,createUserDto);
      this.repo.create(user);
      await this.repo.save(user);
      delete user.password;
      return user;
    }
  }

}
