import express from 'express'
import cors from 'cors'
//import cookieParser from 'cookie-parser';
import configDotenv from 'dotenv';
configDotenv.config();
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'
const PORT = 5000;
const app = express();

// app.use(cors({
//     origin: 'http://127.0.0.1:8080',
//     credentials: true,  // Allow cookies to be sent
// }));
//app.use(cookieParser()); // Parse cookies
app.use(cors());
app.use(express.json({ limit: '50mb' }));     //limit to remove the error -payload too large
app.use('/uploads', express.static('uploads'));
app.use('/user', userRoute);

app.use('/auth', authRoute);
app.use('/test',(req,res)=>res.send(' Bye world'))
app.use('/',(req,res)=>res.send('Hello world'))
app.listen(PORT, (req, res) => {
    console.log("server is running on PORT: ", PORT);
})