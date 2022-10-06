const Movie = require("../Model/movieModel");
const Theatre = require('../Model/cinemaHall');
const User = require('../Model/userModel')
const { findById, remove } = require("../Model/cinemaHall");
const { response } = require("express");

// To fetch all the movies in the theatre
const getMovies = async(req, res) => {
    try{
        const movies = await Movie.find().populate('theatre', 'name').populate('user', 'name').lean().exec();
        res.send(movies);
    } catch(e){
        res.status(500).send({message: e.message});
    }
};

// To fetch the single movie by its ID
const getMoviesById = async(req, res) => {
    try{
        const movie = await Movie.findById(req.params.id).lean().exec();
        res.send(movie);
    } catch(e){
        res.status(500).send({message: e.message});
    }
};

// To fetch the single movie by its movie name
const getMoviesbyName = async(req, res)=>{
    try{
        const movie = await Movie.findOne({movie_name:req.params.id}).populate('theatre', 'name').populate('user', 'name')
        res.send(movie)
    }catch(e){
        res.status(500).send({message: e.message});
    }
}

// To create a movies
const createMovies = async(req, res)=>{
    try{
        const movies = await Movie.create(req.body)
        res.send(movies);
    } catch(e){
        res.status(500).send({message: e.message})
    }
}

// To delete the movie by its ID
const deleteMoviebyID = async(req, res)=>{
    try{
        const deleteMovies = await Movie.findByIdAndRemove(req.params.id)
        res.send("movie deleted by ID successfully")
    } catch(e){
        res.status(500).send({message: e.message})
    }
}

// To update the theatre field in the movies
const updateTheatreInMovies = async(req, res)=>{
    try{
        const needupdateMovieId = await Movie.findById(req.params.id)
        const theatreUpdate = await Theatre.findById(req.body.theatre)
        let theatreInArray = needupdateMovieId.theatre
        console.log(theatreInArray);
        theatreInArray.push(theatreUpdate)
        console.log(theatreInArray);
        Movie.findByIdAndUpdate(req.params.id, {theatre:theatreInArray}, { new: true }).then(response=>{
            res.status(200).json({
                response
            })
        })
        // const updationInMovies = await Movie.findByIdAndUpdate(req.params.id, )
    } catch(e){
        res.status(500).send({message: e.message})
    }
}

// To update the user field in the movies (tickets booking method)
const updateUsersInTheatre = async(req, res)=>{
    try{
        const needUpdateMovieId = await Movie.findById(req.params.id)
        console.log('req.params.id: ', needUpdateMovieId);
        const lengthOfSeatsBooked = needUpdateMovieId.user.length + 1
        const noOfSeatsInTheatre = 4
        if(lengthOfSeatsBooked>noOfSeatsInTheatre){
            return res.status(404).json({
                total_seats_In_Theatre : noOfSeatsInTheatre,
                message:"OOPS...!!! HouseFull...!!! No seats available :( "
            })
            // return res.send("OOPS...!!! HouseFull...!!! No seats available :( ")
        }
        const userUpdate = await User.findById(req.body.user)
        let userInArray = needUpdateMovieId.user
        console.log(userInArray)
        userInArray.push(userUpdate)
        console.log(userInArray);
        Movie.findByIdAndUpdate(req.params.id, {user: userInArray}, {new: true}).then(response =>{
            console.log(response);
            res.status(200).json({
                message:"Seat booked",
                total_no_of_seats_in_theatre: noOfSeatsInTheatre,
                no_of_seatsBooked: lengthOfSeatsBooked
            })
            // const lengthOfSeatsBooked = response.user.length
            // const noOfSeatsInTheatre = 4
            // if(lengthOfSeatsBooked>noOfSeatsInTheatre){
            //     res.send("OOPS...!!! HouseFull...!!! No seats available :( ")
            // }else{
                // res.status(200).json({
                //     message:"Seat booked",
                //     total_no_of_seats_in_theatre: noOfSeatsInTheatre,
                //     no_of_seatsBooked: lengthOfSeatsBooked
                // })
            // }
        })
    } catch(e){
        res.status(500).send({message: e.message})
    }
}


const cancelTickets = async(req, res)=>{
    try{
        const theMovie = await Movie.findOne({movie_name:req.params.id})
        const users_Booked_Seats = theMovie.user
        // console.log(users_Booked_Seats);
        users_Booked_Seats.forEach(el =>{
            // console.log(el)
            const canclTck = req.body.cancelTicket
            // if(el === ){
                // return delete users_Booked_Seats[el]
                // console.log(typeof el);
                console.log(Array(el)); 
            // }else{
            //     console.log("hii from else block");
            // }
        })
        // console.log(users_Booked_Seats);
        // for(i=0;i<users_Booked_Seats.length;i++){
        //     if()
        // }
        res.send("check")
    } catch(e){
        res.status(500).send({message: e.message})
    }
}
// const seatsOfUsers = async(req, res)=>{
//     try{
//         res.status(200).json({
//             seats_Booked:""
//         })
//     } catch(e){
//         res.status(500).send({message: e.message})
//     }
// }

module.exports = {
    getMovies, getMoviesById, createMovies, getMoviesbyName, updateTheatreInMovies, deleteMoviebyID, updateUsersInTheatre, cancelTickets
};