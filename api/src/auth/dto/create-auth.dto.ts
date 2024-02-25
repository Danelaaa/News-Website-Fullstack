import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    firstname:string;
    @IsString()
    @IsNotEmpty()
    lastname:string;
    @IsString()
    @IsNotEmpty()
    email:string;
    @IsString()
    @IsNotEmpty()
    password:string;
    @IsString()
    @IsOptional()
    profilePic:string;
}
