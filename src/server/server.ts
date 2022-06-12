import express from 'express';
import path from 'path';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from "cors";
import { authRouter, userRouter } from '../Routers';
import { mapsRouter } from '../Routers/maps';
import { authMiddleware } from '../Middlewares';
export default class Server {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.app.use(bodyParser.json());
    }

    static init(port: number) {
        return new Server(port);
    }

    publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }

    start(callback: Function) {
        this.ConfigHeaders()
        this.middlewares();
        this.Routes();
        this.app.listen(this.port, callback());
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(authMiddleware);
    }

    Routes() {
        this.app.use('/user', userRouter);
        this.app.use('/auth', authRouter);
        this.app.use('/restaurants', mapsRouter);
        this.app.get('*', function (req, res) {
            res.send('Page not found').status(404);
        });

    }

    ConfigHeaders() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        const corsOptions = {
            exposedHeaders: [
                "X-Auth",
                "X-Total-Pages",
                "X-Current-Page",
                "X-Next-Page",
                "X-Prev-Page",
                "X-Total-Records",
            ],
            origin: "*",
            methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
            preflightContinue: false,
            optionsSuccessStatus: 204,
        };

        this.app.use(cors(corsOptions));


    }

}