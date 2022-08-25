const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// get userdata

router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

// register user

router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { name, middlename, email, password, age, mobile, work, add, desc } =
    req.body;

  if (
    !name ||
    !middlename ||
    !email ||
    !password ||
    !age ||
    !mobile ||
    !work ||
    !add ||
    !desc
  ) {
    res.status(422).json("Please fill required feilds");
  }

  try {
    const preuser = await users.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(422).json("Email already acquired");
    } else {
      const adduser = new users({
        name,
        middlename,
        email,
        password,
        age,
        mobile,
        work,
        add,
        desc,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// get individual user

router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await users.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

// update user data

router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateduser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateduser);
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletuser = await users.findByIdAndDelete({ _id: id });
    console.log(deletuser);
    res.status(201).json(deletuser);
  } catch (error) {
    res.status(422).json(error);
  }
});
// Login User
router.post("/login", async (req, res) => {
  console.log("req :::::", req);
  const { email, password } = req.body;
  users.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({
          status: 200,
          data: user,
          msg: "Login Successful",
          error: null,
        });

        // res.send({ message: "login sucess", user: user });
      } else {
        res.send({
          status: 404,
          data: [],
          msg: "",
          error: "Wrong ",
        });

        // res.send({ message: "wrong credentials" });
      }
    } else {
      res.send("not register");
    }
  });
});
// // Register User
// router.post("/register", async (req, res) => {
//   console.log(req.body);
//   const { name, email, password } = req.body;
//   User.findOne({ email: email }, (err, user) => {
//     if (user) {
//       res.send({ message: "user already exist" });
//     } else {
//       const user = new User({ name, email, password });
//       user.save((err) => {
//         if (err) {
//           res.send(err);
//         } else {
//           res.send({ message: "sucessfull" });
//         }
//       });
//     }
//   });
// });

module.exports = router;
