import Express from "express";

import {verifyUser,verifyAdmin}  from "../utils/verifyToken.js";
import { createBooking, getAllBooking, getBooking } from "../controler/bookingControler.js";

const router = Express.Router();

router.post("/" , createBooking);      // verifyuser
router.get("/:id", verifyUser,getBooking);
router.get("/", verifyAdmin,getAllBooking);

export default router;
 