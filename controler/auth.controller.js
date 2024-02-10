
import jwt from 'jsonwebtoken'
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.userName,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });

    await newUser.save();
    res.status(200).json({ success: true, message: "successfully created " });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to created " });
    console.log(err);
  }
};

export const login = async (req, res) => {
  const email = req.body.email;

  console.log("email", req.body.email);
  console.log("pass", req.body.password);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    // Include more user data in the response as needed
    const { _id, username, email: userEmail, role } = user;

    res.status(200).json({
      success: true,
      message: "Successfully login",
      data: { _id, username, email: userEmail, role },
    });
  } catch (err) {
    console.error(err); // Log the error message
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};


