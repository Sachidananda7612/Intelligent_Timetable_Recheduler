const express=require('express');
const{getUser,getTimetable}=require('../controller/controller');
const router=express.Router();

router.get("/getUser",getUser);
router.get("/getTimetable",getTimetable);
module.exports=router;

