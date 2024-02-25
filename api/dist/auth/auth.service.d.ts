import { CreateAuthDto } from './dto/create-auth.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly repo;
    private jwtService;
    constructor(repo: Repository<User>, jwtService: JwtService);
    login(loginDto: UserLoginDto): Promise<{
        token: string;
        user: User;
    }>;
    verifyPassword(password: string, hash: string): Promise<any>;
    register(createUserDto: CreateAuthDto): Promise<User>;
}
