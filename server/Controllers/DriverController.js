var nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const Driver = require("../Models/DriverModel");
const { createSecretToken } = require("../util/SecretToken");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
   user: 'logeshe48@gmail.com',
   pass: process.env.MAIL_APP_PASSWORD
  },
 });

// Send email
module.exports.sendMail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    if ( !to || !subject || !text) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const mailOptions = {
      // from,
      to,
      subject,
      text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Email send error:", error);
        return res.status(500).json({ message: "Failed to send email", error });
      } else {
        return res.status(200).json({ message: "Email sent", info });
      }
    });
  } catch (error) {
    console.error("SendMail error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addDriverData = async (req, res, next) => {
  try {
    // Getting driver data from the body, including 'preferencing'
    const { driverId, driverNumber, points, freeSeats, riderType, preferencing } = req.body;

    // {
    //   "driverId": "driver123",
    //   "points": [
    //     { "lat": 13.0843, "lng": 80.2705 },
    //     { "lat": 13.0845, "lng": 80.2707 }
    //   ],
    //   "freeSeats": 3,
    //   "riderType": "paid",
    //   "preferencing": ["Shared Cost", "Carpool"]
    // }

    // Check if driver already exists
    const existingDriver = await Driver.findOne({ driverId });
    if (existingDriver) {
      return res.json({ message: "Driver already exists" });
    }

    // Create a new driver entry in the database, including 'preferencing'
    const driver = await Driver.create({ driverId, driverNumber, points, freeSeats, riderType, preferencing });

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
    const { driverId, points, freeSeats, riderType, preferencing } = req.body;

    // Find the driver by driverId and update the data, including 'preferencing'
    const updatedDriver = await Driver.findOneAndUpdate(
      { driverId },
      { driverNumber, points, freeSeats, riderType, preferencing, updatedAt: new Date() },
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

// Fetch all driver data
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


// module.exports.bookDriver = async (req, res) => {
//   try {
//     const { driverId, riderEmail } = req.body;

//     if (!driverId || !riderEmail) {
//       return res.status(400).json({ message: "Driver ID and rider email are required" });
//     }

//     const driver = await Driver.findOne({ driverId });

//     if (!driver) {
//       return res.status(404).json({ message: "Driver not found" });
//     }

//     if (driver.freeSeats <= 0) {
//       return res.status(400).json({ message: "No available seats" });
//     }

//     // Decrease seat count
//     driver.freeSeats -= 1;
//     await driver.save();

//     // Setup nodemailer (put this in a better place in real apps)
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true,
//       auth: {
//        user: 'logeshe48@gmail.com',
//        pass: process.env.MAIL_APP_PASSWORD
//       },
//      });

//     // Compose email
//     const mailOptions = {
//       to: riderEmail,
//       subject: "Your Ride Booking Confirmation",
//       text: `Your ride has been successfully booked!

// Driver Details:
// - Driver ID: ${driver.driverId}
// - Location: ${driver.points[0].lat}, ${driver.points[0].lng}
// - Free Seats Remaining: ${driver.freeSeats}
// - Rider Type: ${driver.riderType}
// - Preferences: ${driver.preferencing.join(", ")}

// Thank you for choosing our service!`,
//     };

//     // Send email
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.error("Error sending confirmation email:", error);
//         return res.status(500).json({
//           message: "Booking succeeded, but email failed to send",
//           success: true,
//           driver,
//         });
//       } else {
//         return res.status(200).json({
//           message: "Driver booked and confirmation email sent!",
//           success: true,
//           driver,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error booking driver:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

module.exports.bookDriver = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Decode the token using the same secret from your auth middleware
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Rider not found" });
    }

    const { driverId } = req.body;

    const driver = await Driver.findOne({ driverId });
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    if (driver.freeSeats <= 0) {
      return res.status(400).json({ message: "No available seats" });
    }

    // Decrease free seats
    driver.freeSeats -= 1;
    await driver.save();

    // Send confirmation email to the rider
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
       user: 'logeshe48@gmail.com',
       pass: process.env.MAIL_APP_PASSWORD
      },
     });
    //  const driverLat = driver.points[0].lat;
     const driverLat = driver.points[0].lat;
     const driverLng = driver.points[0].lng;
     const mapsLink = `https://www.google.com/maps?q=${driverLat},${driverLng}`;
     
     const mailOptions = {
       to: user.email,
       subject: "Ride Booking Confirmation",
    //    text: `Hi ${user.username},
     
    //  You have successfully booked a ride with driver ${driver.driverId}.
     
    //  Pickup Point: ${mapsLink}
    //  Available Seats Left: ${driver.freeSeats}
    //  Rider Type: ${driver.riderType}
    //  Preferences: ${driver.preferencing.join(", ")}
     
    //  Thanks for using Campus Carpooling!`,
       html: `
         <p>Hi ${user.username},</p>
         <p>You have successfully booked a ride with driver ${driver.driverId}.</p>
     
         <p>Driver Contact Number: ${driver.driverNumber}</p>
         <p>Pickup Point: <a href="${mapsLink}" target="_blank">Link to map</a></p>
         <p>Available Seats Left After Your Booking: ${driver.freeSeats}</p>
         <p>Rider Type: ${driver.riderType}</p>
         <p>Preferences: ${driver.preferencing.join(", ")}</p>
         <p>Thanks for using <strong>Campus Carpooling</strong>!</p>
       `
     };
     


    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Driver booked successfully and confirmation email sent.",
      driver,
    });
  } catch (error) {
    console.error("Error in bookDriver:", error);
    res.status(500).json({ message: "Booking failed", error });
  }
};

