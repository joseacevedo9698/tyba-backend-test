import Server from './server/server';
import * as dotenv from 'dotenv';
// import database from './server/database';

dotenv.config();

const server = Server.init(Number(process.env.PORT));
server.start(() => {
    console.log('servidor corriendo en el puerto ' + process.env.PORT);
});

export { server };