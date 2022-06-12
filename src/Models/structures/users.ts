import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { IUser } from '../interfaces';
export class UserStructure {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    lastname: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    constructor(data: IUser) {
        this.email = data.email
        this.lastname = data.lastname
        this.name = data.name
        this.password = data.password
    }
}