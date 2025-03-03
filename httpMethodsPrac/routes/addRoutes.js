import express from 'express';
const router = express.Router(); 

router.post('/data',(req,res) => {
    console.log("data:",req.body);
    res.send("successfully stored the data");
})

export default router;