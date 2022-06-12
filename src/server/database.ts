import  mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();


mongoose.connect(""+process.env.CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
});
export default mongoose;


