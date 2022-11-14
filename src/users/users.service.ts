import {HttpException, HttpStatus,Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({attributes:['firstname', 'lastname','age', 'email', 'gender']});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}})
        return user;
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findOne({where: {id}, attributes:['firstname', 'lastname','age', 'email', 'gender']})

        if (!user) {
            throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
        } else {
            return user;
        } 
    }
}
