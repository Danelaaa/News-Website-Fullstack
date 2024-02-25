import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Request, Response } from 'express';
import { CurrentUser } from './user.decorator';
import { User } from './entities/user.entity';
import { CurrentUserGuard } from './current-user.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async userLogin(@Body() userLoginDto:UserLoginDto,@Res() res:Response){

    const {token,user} = await this.authService.login(userLoginDto);

    res.cookie('IsAuthenticated',true,{maxAge: 2*60*60*1000}) // max age 2 hours
    res.cookie('Authentication',token,{
      httpOnly:true,
      maxAge: 2*60*60*1000
    });

    return res.send({success: true,user});

  }

  @Post('register')
  async userRegistration(@Body() userCreateDto: CreateAuthDto){
    return this.authService.register(userCreateDto);
    
  }

  @Get('authstatus')
  @UseGuards(CurrentUserGuard)
  authStatus(@CurrentUser() user:User){
    return { status: !!user,user };
  }


  @Post('logout')
  logout(@Req() req: Request,@Res() res:Response){
    res.clearCookie("Authentication");
    res.clearCookie("IsAuthenticated")

    return res.status(200).send( { success: true });
  }
}
