import express from "express";
import UserController from "../Controllers/user_controller";
const router = express.Router();
router.post("/", UserController.create );


const userRouter = router;

export { userRouter };
