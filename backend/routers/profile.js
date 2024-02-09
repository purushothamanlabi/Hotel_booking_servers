import  Express  from "express";
import {profile} from './../controler/profile.controler.js'

const router = Express.Router();

router.get("/profile/:id",profile)

  

export default router 