import express from 'express';
import indexRoutes from './routes/indexRoutes.js';
const app = express();
const PORT = 4000;

app.use('/',indexRoutes);

app.listen(PORT,() => {
    console.log("Server is running at port",PORT);
})