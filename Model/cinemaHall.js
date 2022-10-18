const mongoose = require("mongoose");

const cinemaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // sub_region: { type: String, required: true },
    // cancellation_availab: { type: Boolean, required: true },
    // users:[{
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref:'User',
    //   // required:true
    // }],
    movies:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'movie',
      // required:true
    }],
    timings:
    {
      type: String, 
      required: true 
    },
    // screens:
    //   {
    //     screen_no:Number,
    //     movie:[{
    //       type:mongoose.Schema.Types.ObjectId,
    //       ref:'movie',
    //       // required:true
    //     }],
    //     available_tickets:Number,
    //     booked_tickets:Number
    //   }
  }
);
const Cinema = mongoose.model("CinemaHall", cinemaSchema);

module.exports = Cinema; //theaters la movie vaenum 