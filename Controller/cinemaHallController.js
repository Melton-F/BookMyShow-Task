const Cinema = require('../Model/cinemaHall');

const getCinemas = async(req, res) => {
    try{
        const cinemas = await Cinema.find().lean().exec();
        res.send(cinemas);
    } catch(e){
        res.status(500).send({message: e.message});
    }
};

const getCinemasByID = async(req, res) => {
    try{
        const cinema = await Cinema.findById(req.params.id).lean().exec();
        res.send(cinema);
    } catch(e){
        res.status(500).send({message: e.message});
    }
};

module.exports = {
    getCinemas, getCinemasByID
}