import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import tourRoute from "./routers/Tours.js";
import authRoute from "./routers/auth.js";
import reviewRoute from "./routers/reviews.js";
import bookingRoute from "./routers/booking.js";
import profileRoute from "./routers/profile.js"




dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
  credentials: true,
};

// // db connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongo conected ");
  } catch (err) {
    console.log("no con mongo");
  }
};
 
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/v1", tourRoute);   
app.use("/api/v1/auth", authRoute);   
app.use("/api/v1/review", reviewRoute);   
app.use("/api/v1/booking", bookingRoute);  
app.use("/api/v1", profileRoute)    




app.listen(port, () => {
  connect();
  console.log("server listen port", port);
});
  
