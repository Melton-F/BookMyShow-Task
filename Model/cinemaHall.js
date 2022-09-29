const mongoose = require("mongoose");

const cinemaSchema = new mongoose.Schema(
  // {
  //   name: { type: String, required: true },
  //   sub_region: { type: String, required: true },
  //   cancellation_availab: { type: Boolean, required: true },
  //   timings: [{ time: { type: String, required: true } }],
  // },
  // { versionKey: false, timestamps: true }
  {
    name:String,
    screenAvailable:Number,
    screen_with_movies:[
      {
        screen_no:Number,
        movie:String,
        available_tickets:Number,
        booked_tickets:Number
      }
    ]
  }
);

const Cinema = mongoose.model("CinemaHall", cinemaSchema);

module.exports = Cinema; //theaters la movie vaenum