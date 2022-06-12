/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, LatLngLiteral, PlaceData } from "@googlemaps/google-maps-services-js";

interface IOptions {
    location?: LatLngLiteral;
    city?: string;
}

interface IResponse {
    name: string;
    address: string;
    location: {
        lat: number;
        lng: number;
    };
    id: string;
}

export default class Restaurants {

    public static async getRestaurants(options: IOptions): Promise<IResponse[]> {
        const client = new Client({});
        const response = await client.placesNearby({
            params: {
                location: options.location || await Restaurants.getLatLngByCity(options.city),
                radius: 2000,
                key: process.env.GOOGLE_API_KEY,
                type: "restaurant",
            },
        });
        const places = response.data.results;
        return places.map((restaurant: PlaceData) => {
            return {
                name: restaurant.name,
                location: restaurant.geometry.location,
                address: restaurant.vicinity,
                id: restaurant.place_id,
            }
        });
    }

    public static async getLatLngByCity(city: string): Promise<LatLngLiteral> {
       
        try {
            const client = new Client({});
            const response = await client.geocode({
                params: {
                    address: city,
                    key: process.env.GOOGLE_API_KEY,
                },
            });
    
            const lat = response.data.results;
            return lat[0].geometry.location;
        } catch (error) {
            console.log(error);
        }

    }
}