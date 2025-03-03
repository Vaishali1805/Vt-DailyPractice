import express from 'express';
const router = express.Router();
 
router.delete("/data",(Req,res) => {
    console.log("/delete/data")
    res.send("successfully delete the data");
})

export default router;