import express from "express"
import { deleteBooking, getBooking, newBooking } from "../Controllers/booking-controller.js"

const bookingRoutes = express.Router()

bookingRoutes.post("/", newBooking)
bookingRoutes.get("/:id", getBooking)
bookingRoutes.delete("/:id", deleteBooking)

export default bookingRoutes