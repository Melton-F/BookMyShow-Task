const Movie = require("../Model/movieModel");


const getMovies = async(req, res) => {
    try{
        const movies = await Movie.find().lean().exec();
        res.send(movies);
    } catch(e){
        res.status(500).send({message: e.message});
    }
};

const getMoviesById = async(req, res) => {
    try{
        const movie = await Movie.findById(req.params.id).lean().exec();
        res.send(movie);
    } catch(e){
        res.status(500).send({message: e.message});
    }
};


module.exports = {
    getMovies, getMoviesById
};