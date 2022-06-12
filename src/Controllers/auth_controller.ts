// controlador de usuarios
import { Request, Response } from 'express';
import { IUser, UserModel } from '../Models';
import * as jwt from 'jsonwebtoken';
import { compareSync } from 'bcrypt';


export default class AuthController {
    public static async auth(req: Request, res: Response) {
        const email = req.body.email;
        const password = req.body.password;

        const user: IUser | null = await UserModel.findOne({ email });

        if (user) {
            if (compareSync(password, user.password)) {
                const expiresIn = 6000;
                const payload = {
                    userId: user._id
                };
                const token = jwt.sign(payload, "" + process.env.KEY, {
                    expiresIn: expiresIn
                });
                res.json({
                    status: "Authenticate",
                    token: token,
                    expiresIn: expiresIn
                });
            } else {
                res.status(401).json({
                    status: "Unauthenticated",
                    message: "Incorrect credentials"
                })
            }

        } else {
            res.status(401).json({
                status: "Unauthenticated",
                message: "Incorrect credentials"
            })
        }
    }

}