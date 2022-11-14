import { Column, DataType,  Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @ApiProperty({example: 'Jack', description: 'firstname'})
    @Column({type: DataType.STRING, allowNull: false})
    firstname: string;

    @ApiProperty({example: 'Sparrow', description: 'lastname'})
    @Column({type: DataType.STRING, allowNull: false})
    lastname: string;

    @ApiProperty({example: 'test@gmail.com', description: 'email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    
    @ApiProperty({example: '24', description: 'age'})
    @Column({type: DataType.INTEGER, allowNull: false})
    age: number;

    @ApiProperty({example: 'Male', description: 'gender'})
    @Column({type: DataType.STRING, allowNull: false})
    gender: string;
    
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
}
