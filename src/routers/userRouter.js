const express = require("express");
const router = new express.Router();
const User = require('../models/User')
// const auth = require("../middleware/auth");

//create user
router.post("/users/signup", async (req, res) =>{

  try {
    //create a new user based on req.body
    const user = new User(req.body);

    if (await user.addUser() === true)
    {
      res.status(201).send({token: user.token});
      console.log("added user -- success")
    } else {

      throw new Error("This user exists")
    }

  } catch (e) {
    res.status(400).send(e);
  }
});

//login user
router.post("/users/login", async (req, res) => {
  try {
    //find user
    const user = new User(req.body)
     
    if (await user.findUser() === true)
    {
      res.send({token: user.token})

    } else {
      
      res.send({auth: false})
    }
  } catch (e) {
    res.status(400).send({auth: false});
  }
});

module.exports = router;
