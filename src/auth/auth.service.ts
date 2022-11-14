import { Injectable, HttpException, HttpStatus, UnauthorizedException} from '@nestjs/common';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthUserDto } from "./dto/auth-user.dto"
import { UsersService } from "../users/users.service";
import { User } from "../users/users.model";
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
constructor(private userService: UsersService,
        private jwtService: JwtService) {}

    async getUserByEmail(email:string) {
        const user = await User.findOne({ where: { email: email } });
        return user;
      }

    async login(userDto: AuthUserDto) {
        if(!userDto.email || !userDto.password) {
            throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED)
        }

        const user = await this.validateUser(userDto)    
        return this.generateToken(user)      
    }

    private async validateUser(userDto: AuthUserDto) {
        const user = await this.getUserByEmail(userDto.email);  
        
        if (!user) { 
           throw new UnauthorizedException({message: 'Incorrect email'})  
        }

        const passwordEquals = await bcrypt.compare(userDto.password, user.password); 

        if (passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({message: 'Incorrect password'})
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async registration(userDto: CreateUserDto) {
            const candidate = await this.userService.getUserByEmail(userDto.email);

            if (candidate) {
                throw new HttpException('Email is already used', HttpStatus.BAD_REQUEST);
            }

            const hashPassword = await bcrypt.hash(userDto.password, 10);
            const user = await this.userService.createUser({...userDto, password: hashPassword})
            
            return this.generateToken(user)
    }

}

