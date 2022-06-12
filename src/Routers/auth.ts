import express from 'express';
import AuthController from '../Controllers/auth_controller';

const router = express.Router();

router.post('/', AuthController.auth);

const authRouter = router;

export {authRouter};