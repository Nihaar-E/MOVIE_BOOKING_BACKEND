import express from "express";
import {
  addMovie,
  getAllMovies,
  getMovieById,
} from "../Controllers/movie-controllers.js";
const movieRoutes = express.Router();
 
movieRoutes.post("/", addMovie);
movieRoutes.get("/", getAllMovies);
movieRoutes.get("/:id", getMovieById);

export default movieRoutes;
