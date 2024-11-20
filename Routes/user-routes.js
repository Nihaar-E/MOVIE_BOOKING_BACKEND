import express from "express";
import {
  deleteUser,
  getAllBookingsOfUser,
  getAllUser,
  login,
  signup,
  updateUser,
} from "../Controllers/user-controllers.js";
const userRoutes = express.Router();

userRoutes.get("/", getAllUser);
userRoutes.post("/signup", signup);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);
userRoutes.post("/login", login);
userRoutes.get("/bookings/:id", getAllBookingsOfUser);

export default userRoutes;
