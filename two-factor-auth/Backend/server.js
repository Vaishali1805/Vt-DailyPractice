import express from 'express'
const app = express();
import configDotenv from 'dotenv';
configDotenv.config();

import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:5173',
  //credentials: true // if you are sending cookies or authentication
}));

//Middlewares
app.use(express.json());

//Routes
import authRoute from './route/authRoute.js';

app.use('/auth',authRoute);

app.listen(process.env.PORT,(req,res) => {
    console.log("server is running on PORT: ",process.env.PORT);
})
