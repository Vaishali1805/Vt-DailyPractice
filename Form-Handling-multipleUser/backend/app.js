import express from 'express'
import cors from 'cors'
const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));     //limit to remove the error -payload too large
app.use('/uploads', express.static('uploads'));

import submitRoute from './routes/submitRoute.js';
import getDataRoute from './routes/getDataRoute.js';

app.use('/submit',submitRoute);
app.use('/get',getDataRoute);
// app.use('/delete',deleteRoute);

app.listen(PORT,(req,res) => {
    console.log("server is running on PORT: ",PORT);
})