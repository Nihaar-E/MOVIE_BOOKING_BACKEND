import express from "express";
import { adminLogin, adminSignup, allAdmins } from "../Controllers/admin-controllers.js";

const adminRoutes = express.Router();

adminRoutes.post("/signup", adminSignup)
adminRoutes.post("/login", adminLogin)
adminRoutes.get("/", allAdmins)

export default adminRoutes