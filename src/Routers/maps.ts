import express from "express";
import RestaurantController from "../Controllers/restaurant_controller";
const router = express.Router();
router.get("/historic", RestaurantController.getHistoric );
router.get("/", RestaurantController.getInfo );
const mapsRouter = router;

export { mapsRouter };
