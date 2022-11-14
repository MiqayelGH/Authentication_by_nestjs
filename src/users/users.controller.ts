import { Controller, Get, Param} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    
    @ApiOperation({summary: 'Get user by id'})
    @ApiResponse({status: 200, type: [User]})
    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }
}
