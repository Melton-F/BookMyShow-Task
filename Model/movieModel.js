const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    movie_name: { type: String, required: true },
    // movie_grade: { type: String, required: true },
    // languages: { type: String, required: true },
    // banner_image_url: { type: String, required: true },
    // cover_image_url: { type: String, required: true },
    // rating: {
    //   percentage: { type: Number, required: true },
    //   no_of_ratings: { type: Number, required: true },
    // },
    movie_duration: { type: String, required: true },
    release_date: { type: String, required: true },
    // is_premier: { type: Boolean, required: true },
    // screen_type: [{ type: { type: String, required: true } }],
    // movie_genre: [{ genre: { type: String, required: true } }],
    about_movie: { type: String, required: true },
    theatre:[{
      type: mongoose.Schema.Types.ObjectId, 
      ref:"CinemaHall"
    }],
    user:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    }]
  },
  {timestamps: true }
);

const Movie = mongoose.model('movie', movieSchema);



module.exports = Movie;

