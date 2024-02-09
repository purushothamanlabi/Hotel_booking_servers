import User from "../models/User.js";
import books from '../models/book.js'

export const profile = async (req, res) => {
  const profileId = req.params.id;

  try {
    const user = await User.findById(profileId);
    const bookings = await books
      .find({ userId: profileId })
      .sort({ createdAt: -1 }) 
      .limit(1);

    res.status(200).json({
      name: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      Booking:bookings
    });

    console.log(bookings);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
