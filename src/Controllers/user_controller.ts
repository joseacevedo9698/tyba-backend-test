// controlador de usuarios
import { Request, Response } from 'express';
import { IUser, UserModel, UserStructure } from '../Models';
import { hashSync } from 'bcrypt';
import { validate } from 'class-validator';

export default class UserController {
    public static async create(req: Request, res: Response) {
        const data = new UserStructure(req.body);
        const errors = await validate(data);
        if (errors.length > 0) {
            res.status(400).json({
                message: 'Validation failed',
                errors,
            });
            return;
        }
        if (await UserController.emailExists(data.email)) {
            res.status(400).json({
                message: 'Email already exists',
                created: false,
            });
            return;

        }
        data.password = hashSync(data.password, 10);
        const user = new UserModel(data);
        const is_save = await user.save();
        if (is_save) {
            return res.status(201).json({
                message: 'User created',
                created: true,
            });
            return;

        } else {
            return res.status(400).json({
                message: 'Error creating user',
                created: false,
            });
            return;

        }
    }

    public static  async emailExists(email: string): Promise<boolean> {
        const user:IUser = await UserModel.findOne({ email });
        
        if (user) {
            return true;
        }
        return false;
    }

}