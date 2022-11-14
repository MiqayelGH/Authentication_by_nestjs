import { Controller, Body, Post } from '@nestjs/common';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthUserDto } from './dto/auth-user.dto';
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('/login')
    login(@Body() userDto: AuthUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}   
