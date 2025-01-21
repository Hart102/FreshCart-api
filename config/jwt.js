require("dotenv").config();
const jwt = require("jsonwebtoken");

const Jwt = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.json({
      isError: true,
      message: "Access denied, please login and try again!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err.message);
    res.json({ isError: true, message: "Invalid authentication token!" });
  }
};

module.exports = Jwt;
