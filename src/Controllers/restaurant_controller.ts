// controlador de usuarios
import { Request, Response } from 'express';
import Restaurants from '../Handlers/restaurants';
import { ISearching, SearchingModel } from '../Models';

export default class RestaurantController {
    public static async getInfo(req: Request, res: Response) {
        const data = req.body;
        if (data.city) {
            // guarda en la base de datos la busqueda
            const searching = new SearchingModel({
                type: 'city',
                query: data.city,
            });
            await searching.save();
            const restaurants = await Restaurants.getRestaurants({
                city: data.city,
            });
            res.send(restaurants);
        } else {
            if (data.location) {
                const searching = new SearchingModel({
                    type: 'location',
                    query: `${data.location.lat},${data.location.lng}`,
                });
                await searching.save();
                const restaurants = await Restaurants.getRestaurants({
                    location: data.location,
                });
                res.send(restaurants);
            } else {
                res.send({ message: "No se ha enviado ninguna ciudad o coordenadas" });
            }
        }
    }

    public static async getHistoric(req: Request, res: Response) {
        const searching:ISearching = await SearchingModel.find().sort({ createdAt: -1 });
        res.send(searching);
    }
}