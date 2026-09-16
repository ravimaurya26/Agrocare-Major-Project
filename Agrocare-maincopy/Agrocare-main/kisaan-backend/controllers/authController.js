const User = require("../models/User");

// Register User
exports.register = async (req, res) => {
  try {
    const { email, mobile } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = new User(req.body);

    await user.save();

    const { password, ...safeUser } = user._doc;

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user: safeUser,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await User.findOne({
      $or: [{ mobile }, { email: mobile }],
      password,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const { password: pass, ...safeUser } = user._doc;

    res.json({
      success: true,
      message: "Login Successful",
      user: safeUser,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};