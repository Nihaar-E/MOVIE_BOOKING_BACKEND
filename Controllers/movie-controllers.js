import jwt from "jsonwebtoken";
import Movie from "../Models/Movie.js";
import mongoose from "mongoose";
import Admin from "../Models/Admin.js";


export const addMovie = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    if (!token && token.trim() === "") {
        res.status(400).json({"message":"Token invalid"})
    }

    let adminId;

    jwt.verify(token, process.env.SECRET_KEY, (err, decryted) => {
        if (err) {
            return res.status(404).json({"message":`${err.message}`})
        }
        else {
            adminId = decryted.id
        }
    })
    
    const { title, description, posterUrl, releaseDate, featured, actors } = req.body
    if (!title && title.trim() === "" && !description && description.trim() === "" && !posterUrl && posterUrl.trim() === "" && !releaseDate && releaseDate.trim() === "" && !featured && featured.trim() === "" && !actors && actors.trim() === "") {
        return res.status(401).json({"message":"Invalid inputs"})
    }
    let movie;
    try {
        movie = new Movie({
            title,
            description,
            posterUrl,
            featured,
            releaseDate: new Date(`${releaseDate}`),
            actors,
            admin: adminId
        })
        const adminUser = await Admin.findById(adminId)
        const session = await mongoose.startSession()
        session.startTransaction()
        await movie.save({ session })
        adminUser.movies.push(movie)
        await adminUser.save({ session })
        session.commitTransaction()
        


    }
    catch (err) {
        return console.log(err)
    }
    if (!movie) {
        return res.status(500).json({"message":"unexpected error"})
    }
    return res.status(200).json({"message":"Movie added successfully"})

}

export const getAllMovies = async (req, res, next) => {
    let movies 
    try {
        movies = await Movie.find()
     }
    catch (err) {
        return console.log(err)
    }
    if (!movies) {
        return res.status(500).json({"message":"server issue"})
    }
    return res.status(200).json({movies})
}

export const getMovieById = async (req, res, next) => {
    const id = req.params.id
    let movie
    try { 
        movie = await Movie.findById(id)
    }
    catch (err) {
        return console.log(err)
    }
    if (!movie) {
        return res.status(404).json({"message":"Movie doesn't exist"})
    }
    return res.status(200).json({movie})

}