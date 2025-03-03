import express from 'express';
const router = express.Router();

router.put('/data',(req,res) => {
    res.send("successfully update the data");
}) 

router.patch("/fields",(req,res) => {
    res.send("successfully update the fields");
})

export default router;