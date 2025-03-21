import express from 'express'
import cors from 'cors'
const PORT = 4500;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT,(req,res) => {
    console.log("server is running on PORT: ",PORT);
})