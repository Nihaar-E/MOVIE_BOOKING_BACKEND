import Admin from "../Models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const adminSignup = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() == "" && !password && password.trim() == "") {
    return res.status(400).json({ message: "invalid input" });
  }
  let existingUser;
  try {
    existingUser = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(401).json({ message: "user already exists!!" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  let admin;
  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return res.status(500).json({ message: "unable to signup!" });
  }
  return res.status(200).json({ message: "Signup Successful" });
};

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() == "" && !password && password.trim() == "") {
    res.status(400).json({ message: "invalid inputs" });
  }
  let existingUser;
  try {
    existingUser = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(401).json({ message: "user doesn't exist!" });
  }
  const isPasswordTrue = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordTrue) {
    return res.status(401).json({ message: "Incorrect Password" });
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  return res
    .status(200)
    .json({ message: "Login Successful", token, id: existingUser._id });
};
export const allAdmins = async (req, res, next) => {
  let admins
  try { 
    admins = await Admin.find()
  }
  catch (err) {
    return console.log(err)
  }
  if (!admins) {
    return res.status(500).json({message:"Internal error"})
  }
  return res.status(200).json({admins})
}