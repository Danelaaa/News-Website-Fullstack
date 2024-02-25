
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Request } from "express"; 
import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";


export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(User) private readonly repo:Repository<User>){
        super({
            ignoreExpiration: false,
            secretOrKey: 'secretKey',
            jwtFromRequest:ExtractJwt.fromExtractors([(request:Request)=>{
                return request?.cookies?.Authentication;
            }])
        });
    }


    async validate(payload:any,req:Request){
        if(!payload){
            throw new UnauthorizedException('no payload found');

        }

        const user = await this.repo.findOne({ where: { email:payload.email } });

        if(!user){
            throw new UnauthorizedException('no payload found');
        }
        req.user = user;
        return req.user;
    }
}