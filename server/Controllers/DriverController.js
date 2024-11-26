const Driver = require("../Models/DriverModel");
const { createSecretToken } = require("../util/SecretToken");

module.exports.addDriverData = async (req, res, next) => {
  try {
    // Getting driver data from the body
    const { driverId, points, freeSeats, riderType } = req.body;

    // {
    //   "driverId": "driver123",
    //   "points": [
    //     { "lat": 13.0843, "lng": 80.2705 },
    //     { "lat": 13.0845, "lng": 80.2707 }
    //   ],
    //   "freeSeats": 3,
    //   "riderType": "paid"
    // }
    

    // Check if driver already exists
    const existingDriver = await Driver.findOne({ driverId });
    if (existingDriver) {
      return res.json({ message: "Driver already exists" });
    }

    // Create a new driver entry in the database
    const driver = await Driver.create({ driverId, points, freeSeats, riderType });

    // Using MongoDB unique ID
    const token = createSecretToken(driver._id);

    // Set the token in the cookie for authentication or session management
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // Send success response
    res.status(201).json({ message: "Driver data stored successfully", success: true, driver });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Optional: If you want to allow drivers to update their data
module.exports.updateDriverData = async (req, res, next) => {
  try {
    const { driverId, points, freeSeats, riderType } = req.body;

    // Find the driver by driverId and update the data
    const updatedDriver = await Driver.findOneAndUpdate(
      { driverId },
      { points, freeSeats, riderType, updatedAt: new Date() },
      { new: true } // Return the updated document
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({ message: "Driver data updated successfully", success: true, updatedDriver });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//  IT fetches all driver data
module.exports.getAllDriverData = async (req, res) => {
  try {
    // Retrieve all driver documents from the Driver collection
    const drivers = await Driver.find({}); // Empty filter to fetch all data

    // Check if there are any drivers in the collection
    if (!drivers || drivers.length === 0) {
      return res.status(404).json({ message: "No drivers found" });
    }

    // Send success response with all driver data
    res.status(200).json({ message: "Driver data retrieved successfully", success: true, drivers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};