import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  actors: [
    {
      type: String,
    },
  ],
  bookings: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Bookings"
    },
  ],
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

export default mongoose.model("Movie", movieSchema);
