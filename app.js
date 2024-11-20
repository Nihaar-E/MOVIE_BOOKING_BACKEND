import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./Routes/user-routes.js";
import adminRoutes from "./Routes/admin-routes.js";
import movieRoutes from "./Routes/movie-routes.js";
import bookingRoutes from "./Routes/booking-routes.js";
dotenv.config();


const app = express()
app.use(express.json())

app.use("/user", userRoutes)
app.use("/admin", adminRoutes)
app.use("/movie", movieRoutes)
app.use("/booking", bookingRoutes)

mongoose.connect(
    `mongodb+srv://auckchinnaxyz1:${process.env.Password}@moviebookingdb.svurb.mongodb.net/?retryWrites=true&w=majority&appName=moviebookingdb`
).then(() => {
    app.listen(5000, () => {
        console.log("Successfully connected to mongodb!");
    })
}).catch(err => console.log(err));

