import {ApiProperty} from "@nestjs/swagger";

interface Gender {
    Male: string,
    Female: string
}

export class CreateUserDto {
    @ApiProperty({example: 'Jack', description: 'firstname'})
    readonly firstname: string;
    
    @ApiProperty({example: 'Sparrow', description: 'lastname'})
    readonly lastname: string;
    
    @ApiProperty({example: 'user@gmail.com', description: 'email'})
    readonly email: string;

    @ApiProperty({example: '24', description: 'age'})
    readonly age: number;

    @ApiProperty({example: 'Male', description: 'gender'})
    readonly gender: Gender;

    @ApiProperty({example: 'psswrd1234!?', description: 'password'})
    readonly password: string;

}
