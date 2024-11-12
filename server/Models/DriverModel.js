const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  driverId: {
    type: String,
    required: [true, "Driver ID is required"],
    unique: true,
  },
  points: [
    {
      lat: {
        type: Number,
        required: [true, "Latitude is required"],
      },
      lng: {
        type: Number,
        required: [true, "Longitude is required"],
      },
    },
  ],
  freeSeats: {
    type: Number,
    required: [true, "Number of free seats is required"],
    min: [0, "Free seats cannot be less than 0"],
  },
  riderType: {
    type: String,
    enum: ['paid', 'free'],
    required: [true, "Rider type is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

driverSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Driver", driverSchema);


// data Formate 
// {
//   "driverId": "driver123",
//   "points": [
//     { "lat": 13.0843, "lng": 80.2705 },
//     { "lat": 13.0845, "lng": 80.2707 }
//   ],
//   "freeSeats": 3,
//   "riderType": "paid"
// }