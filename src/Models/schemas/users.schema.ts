import mongoose from '../../server/database';
import {IUser} from '../interfaces';
export const UserSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: [false,'NAME_IS_REQUIRED'],
    },
    lastname: {
        type: 'string',
        required: [false,'LASTNAME_IS_REQUIRED'],
    },
    email:{
        type: 'string',
        required: [true,'EMAIL_IS_REQUIRED'],
    },
    password:{
        type:String,
        required:[true,'PASSWORD_IS_REQUIRED'],
        trim:true
    }
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);