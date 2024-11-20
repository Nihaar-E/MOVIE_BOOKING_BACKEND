import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    movies: [{
        type: mongoose.Types.ObjectId,
        ref: "Movie"

    }]
});

export default mongoose.model("Admin", adminSchema)