import express from 'express'
import cors from 'cors'
const PORT = 4500;
const app = express();

app.use(cors());
app.use(express.json());

import submitRoute from './routes/submitRoute.js'
import getDataRoute from './routes/getDataRoute.js'
import deleteRoute from './routes/deleteRoute.js'

app.use('/submit',submitRoute);
app.use('/get',getDataRoute);
app.use('/delete',deleteRoute);

app.listen(PORT,(req,res) => {
    console.log("server is running on PORT: ",PORT);
})