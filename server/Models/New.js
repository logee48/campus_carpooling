const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Neww: {
    type: String,
    required: [true, "user_date"],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("NewDataa", userSchema);
