import express from 'express'
import cors from 'cors'
//import cookieParser from 'cookie-parser';
import configDotenv from 'dotenv';
configDotenv.config();
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'
import { PORT } from './utils/constant.js';
const app = express();

// app.use(cors({
//     origin: 'http://127.0.0.1:8080',
//     credentials: true,  // Allow cookies to be sent
// }));
//app.use(cookieParser()); // Parse cookies
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));     //limit to remove the error -payload too large
app.use('/uploads', express.static('uploads'));

app.use('/user', userRoute);
app.use('/auth', authRoute);

app.listen(PORT, (req, res) => {
    console.log("server is running on PORT: ", PORT);
})