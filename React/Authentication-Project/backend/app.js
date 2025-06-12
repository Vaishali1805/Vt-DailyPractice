import express from 'express'
import { PORT } from './utils/constant.js'
import cors from 'cors'
import path from 'path';
import configDotenv from 'dotenv';
configDotenv.config();
const __dirname = path.resolve();
const app = express();

//Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));   //serve static files
app.use(express.json({ limit: '50mb' }));     //limit to remove the error -payload too large

//Routes
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
app.use('/auth', authRoute);
app.use('/user', userRoute);

app.listen(PORT, (req, res) => {
  console.log("server is running on PORT: ", PORT);
})



// app.use('/uploads', express.static('uploads'));
// app.use(express.static("uploads"));
//import cookieParser from 'cookie-parser';
// app.use(cors({
//     origin: 'http://127.0.0.1:8080',
//     credentials: true,  // Allow cookies to be sent
// }));
//app.use(cookieParser()); // Parse cookies