import {ApiProperty} from "@nestjs/swagger";

export class AuthUserDto {
    @ApiProperty({example: 'user@gmail.com', description: 'email'})
    readonly email: string;

    @ApiProperty({example: 'psswrd1234!?', description: 'password'})
    readonly password: string;
}
