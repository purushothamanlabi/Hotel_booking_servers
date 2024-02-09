
import express  from "express";
import { register } from "../controler/auth.controller.js";
import { login } from "../controler/auth.controller.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);


export default router


