const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware")
const { addDriverData, updateDriverData } = require("../Controllers/DriverController");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification);

// Driver Data Routes
router.post("/add-driver", addDriverData); // Route to add driver data
router.put("/update-driver", updateDriverData); // Route to update driver data

module.exports = router;


