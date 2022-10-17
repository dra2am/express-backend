//will lock certain operations/routes behind authentication
//tokens will be used for auth
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const auth = async (req, res, next) => {
  try {
    //grab token from header and verify
    const token = req.header("Authorization").replace("Bearer ", "");
    const verify = jwt.verify(token, "Cku/s&AS?8e%rb398S");

    //token is "signed" with _id
    const user = await User.findOne({
      _id: verify._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    //store user in req.user and token in req.token
    req.user = user;
    req.token = token;

    next();
  } catch (e) {
    res.status(404).send({ Error: "You must be logged in" });
  }
};

module.exports = auth;
