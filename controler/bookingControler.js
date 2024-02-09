import Booking from "../models/book.js";
const accountSid = "AC6803304fdc276d5482e77f4e2a82b34f";
const authToken = "149e3be28e5ad17abf1e302d094d0364";
const client = twilio(accountSid, authToken);
import twilio from "twilio";

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);

  try {
    if (req.body.phone == "8220575572") {
      await client.messages
        .create({
          body: ` .                                                                                                                                      
      Dear ${req.body.fullName},

      Congratulations! Your booking with us was successful.
    
      Booking Details:
        Address: ${req.body.address}
        Phone: ${req.body.phone}
        Booking Date: ${req.body.bookAt}
    
      Thank you for choosing our services. We look forward to serving you!
    
      Best wishes,
      BookNook ( developed by purushothaman)`,
          to: "+918220575572",
          from: "+16813219593",
        })
        .then((message) => console.log(message.sid))
        .catch((err) => console.log(err));
    }

    const savedBooking = await newBooking.save();

    res.status(200).json({
      success: true,
      message: "Booking tour success ",
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({ success: true, message: "Booking tour failed " });
    console.log("reeeee", err);
  }
};

// get single
export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id);
    res.status(200).json({
      success: true,
      message: "successfull getbook",
      data: book,
    });
  } catch {
    res.status(404).json({ success: true, message: "Booking not found " });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();
    res.status(200).json({
      success: true,
      message: "successfull getbook",
      data: books,
    });
  } catch {
    res.status(500).json({ success: true, message: " internal server error " });
  }
};
