import express from "express";
import {getTourCount, CreateTour, deleteTour, getAllTour, getSingleTour,
     updateTour ,getTourbySearch,getFeaturedTour} from "../controler/Tourcontroler.js";

const router = express.Router();
import { verifyAdmin } from "../utils/verifyToken.js";

// create new tour
router.post("/",verifyAdmin,CreateTour);

// update tour
router.put("/:id",verifyAdmin,updateTour);

// delete tour
router.delete("/:id",verifyAdmin,deleteTour);

// get single tour
router.get("/:id",getSingleTour);

// get all tour 
router.get("/",getAllTour);
// get tour by search
router.get("/search/getTourbySearch" ,getTourbySearch);


// router.get("/search/getFeaturedTour",getFeaturedTour);
router.get("/tours/search/getfeaturedTours", getFeaturedTour);
router.get("/search/getTourCount",getTourCount);










export default router;