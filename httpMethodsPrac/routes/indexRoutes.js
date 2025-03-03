import express from 'express';
const router = express.Router();

import addRoutes from './addRoutes.js'
import updateRoutes from './updateRoutes.js' 
import deleteRoutes from './deleteRoutes.js'

router.use('/add',addRoutes);
router.use('/delete',deleteRoutes);
router.use('/update',updateRoutes);

router.get('/getData',(req,res) => {
    res.send("user data fetched successfully");
})

router.all('/secret',(req,res) => {
    res.send("In the secret Route");
})

router.use('/',(req,res) => {
    res.send("Successfully retrieved the data");
})

export default router;