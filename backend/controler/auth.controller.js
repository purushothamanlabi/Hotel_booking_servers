
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
        .json({ success: false, message: " incorrect emal or pass" });
    }
    const { password, role, ...rest } = user._doc;

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        token,
        success: true,
        message: " successfullly login",
        data: { ...rest },
        role,
      });
  } catch (err) {
    console.error(err); // Log the error message
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
