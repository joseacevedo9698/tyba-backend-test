import express from "express";
import * as jwt from 'jsonwebtoken';
import { TokenDecode } from "../Models";
const router = express.Router();

const routers = [
    '/restaurants'
];

router.all(routers, async (req, res, next) => {
    if (req.headers.authorization) {
        const token: string = req.headers.authorization.replace("Bearer ", "");
        try {
            const { userId } = jwt.verify(
                token,
                "" + process.env.KEY
            ) as TokenDecode;
            req.headers.user_id = userId;
            console.log("url", req.url);

            next();
        } catch (error) {
            return res
                .status(401)
                .json({ message: "INVALID_TOKEN" });
        }


    } else {
        return res.json({ mensaje: 'Token no enviado' });
    }
});



const authMiddleware = router;
export { authMiddleware };