const Cinema = require('../Model/cinemaHall');

const getCinemas = async(req, res) => {
    try{
        const cinemas = await Cinema.find().lean().exec();
        if(cinemas<1){
            res.send("nahi data")
        }else{
            res.send(cinemas);
        }
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

const createCinemas = async(req, res)=>{
        await Cinema.create(req.body).then(createdData =>{
            res.send(createdData)
        }).catch(e =>{
            res.status(500).send({message: e});
        })
}

const deleteTheatre = async(req, res)=>{
    await Cinema.findByIdAndRemove(req.params.id).then(()=>{
        res.status(200).json({
            message:"theatre deleted successfully"
        })
    })
}

module.exports = {
    getCinemas, getCinemasByID, createCinemas, deleteTheatre
}
