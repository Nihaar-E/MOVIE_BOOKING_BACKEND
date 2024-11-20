import Bookings from "../Models/Bookings.js";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
      return console.log(err);
    };
  
  if (!users) {
    return res.status(500).json({ message: "No data" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  if (
    !name &&
    name.trim() == "" &&
    !email &&
    email.trim() == "" &&
    !password &&
    password.trim() == ""
  ) {
    return res.status(400).json({ message: "Invalid details" });
  }
  let user;
  try {
    user = new User({ name, email, password: hashedPassword });
    user = user.save();
  } catch (err)  {
      return res.status(500).json("error occured");
    };
  
  if (!user) {
    return res.status(400).json("invalid data");
  }
  return res.status(200).json({ user });
};

export const updateUser = async (req, res, next) => {
  let id = req.params.id;
  const { name, email, password } = req.body;
  let hashedPassword = bcrypt.hashSync(password);
  if (
    !name &&
    name.trim() == "" &&
    !email &&
    email.trim() == "" &&
    !password &&
    password.trim() == ""
  ) {
    res.status(400).json({ message: "invalid input" });
  }
  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
  } catch (err)  {
      return console.log(err);
    };
  

  return res.status(200).json({ Message: "Updated Successfully" });
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete(id);
    
  }
  catch(err) {

      return console.log(err);

  }
  if (!user) {
    return res.status(500).json({ "message": "something went wrong" });
  }
  return res.status(200).json({ "message": "Deleted Successfully" });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() == "" && !password && password.trim() == "") {
    return res.status(401).json({"message":"unAuthorized"})
  }
  let existingUser;
  try {
    existingUser = await User.findOne({email})
   } 
  catch (err){
    
    return console.log(err)
    
  }
  if (!existingUser) {
    return res.status(400).json({"message": "User doesn't exist!"})
  }
  const isPasswordTrue = bcrypt.compareSync(password, existingUser.password)
  if (!isPasswordTrue) {
    return res.status(401).json({"message":"Incorrect Password"})
  }
  return res.status(200).json({"message":"Login successful"})
}

export const getAllBookingsOfUser = async (req, res, next) => {
  const id = req.params.id
  let bookings
  try {
    bookings = await Bookings.find({ user:id })
    
  }
  catch (err) {
    return console.log(err)
  }
  if (!bookings) {
    res.status(500).json({"message":"No Bookings found"})
  }
  return res.status(200).json({bookings})

}
