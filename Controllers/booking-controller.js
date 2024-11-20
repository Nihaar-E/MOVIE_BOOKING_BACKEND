import mongoose, { mongo } from "mongoose";
import Bookings from "../Models/Bookings.js";
import Movie from "../Models/Movie.js";
import User from "../Models/User.js";

export const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;
  let existingMovie
  let existingUser
  try { 
    existingMovie = await Movie.findById(movie)
    existingUser = await User.findById(user)
  }
  catch (err) {
    return console.log(err)
  }
  if (!existingMovie) {
    return res.status(500).json({message:"Movie doesn't exist"})
  }
  if (!existingUser) {
    return res.status(500).json({message:"User doesn't exist"})
  }
  let book;
  try {
    book = new Bookings({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });

    const session = await mongoose.startSession()
    session.startTransaction()
    await existingUser.bookings.push(book)
    await existingMovie.bookings.push(book)
    await existingUser.save({ session })
    await existingMovie.save({ session })
    await book.save()
    await session.commitTransaction()
    
    
  } catch (err) {
    return console.log(err);
  }
  if (!book) {
    return res.status(401).json({ message: "Booking Failed" });
  }
  return res.status(200).json({ book });
};

export const getBooking = async (req, res, next) => {
  const id = req.params.id
  let book
  try { 
    book = await Bookings.findById(id)
  }
  catch (err) {
    return console.log(err)
  }
  if (!book) {
    return res.status(500).json({"message":"Booking doesn't exist"})
  }
  return res.status(200).json({book})
}

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id
  let booking
  try {
    booking = await Bookings.findByIdAndDelete(id).populate("user movie")
    const session = await mongoose.startSession()
    session.startTransaction()
    await booking.user.bookings.pull(booking)
    await booking.movie.bookings.pull(booking)
    await booking.user.save({ session })
    await booking.movie.save({ session })
    await session.commitTransaction()
  }
  catch (err) {
    return console.log(err)
  }
  if (!booking) {
    return res.status(500).json({message:"Booking doesn't exist"})
  }
  return res.status(200).json({message:"Booking Deleted!"})
}
