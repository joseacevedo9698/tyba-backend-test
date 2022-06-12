import {Document} from 'mongoose';
export interface IUser extends Document {
    _id: string;
    name: string;
    lastname: string;
    email:string;
    password:string;
}

export interface TokenDecode {
    userId: string
    iat: number
}