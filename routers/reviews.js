import Express from "express";
import  {createReview} from "../controler/reviewControler.js";
const router = Express.Router();

router.post("/:tourId",createReview);  //verifyUser

export default router;
