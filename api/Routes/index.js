import express  from "express";

const router = express.Router();

router.post('/signup',(req,res) => {
    
res.send("Hi Karam here it is wokring fine!")
})

export default router;