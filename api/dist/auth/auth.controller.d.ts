import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Request, Response } from 'express';
import { User } from './entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    userLogin(userLoginDto: UserLoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    userRegistration(userCreateDto: CreateAuthDto): Promise<User>;
    authStatus(user: User): {
        status: boolean;
        user: User;
    };
    logout(req: Request, res: Response): Response<any, Record<string, any>>;
}
