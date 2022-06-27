const express = require("express");
const router = express.Router();

const UserModel = require("../Models/restMongoModel");

/**
 * GET home page and getting all data for our router.
 500 is internal server error which means that there is error occurred internally in the server
 */
router.get("/", async (req, res) => {
  try {
    const user = await UserModel.find();
    res.json(user);
    res.render("index", {
      title: "blackmitnick",
      data: res.status(200).json(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET home page and getting one.
 * id is parameter or params so can be accessed using req.params.id
 * SPECIFIC POST
 */
router.get("/:id", getUser, function (req, res) {
  // UserModel.findById(req.params.id)
  //     .then(data => {
  //       res.render('index', { title: 'blackmitnick',data: res.json(data) });
  //     })
  //     .catch(err => res.status(500).json({message: err.message}));
  res.json(res.user);
  // res.send(res.user.name)
});

/**
 * POST creating one
 * submit the post
 */
router.post("/", async (req, res) => {
  const createUser = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const user = await createUser.save();
    // status code 201 means that successfully created an objects
    res.status(201).json(user);
    console.log(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * PATCH updating one
 * PATCH update only data that user pass on, and need to be updated
 * and PUT will update all the information that others are not  needed
 * update user
 */
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    req.user.name = req.body.name;
  }

  if (req.body.email != null) {
    req.user.email = req.body.email;
  }

  if (req.body.password != null) {
    req.user.password = req.body.password;
  }

  try {
    const updatedUser = await res.user.save();
    res.status(201).json(updatedUser);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE deleting one
 */
router.delete("/:id", getUser, async (req, res) => {
  // TODO:  try {
  //     await res.user.remove();
  //     res.json({message: "Deleted user"})
  // }catch (err) {
  //     return  res.status(500).json({message: err.message})
  //
  // }
  res.user
    .remove({ _id: req.params.id })
    .then(() => {
      res.json({ message: "Deleted user" });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

// middleware function for getting the id

async function getUser(req, res, next) {
  let user;
  const id = req.params.id;

  try {
    user = await UserModel.findById(id);
    user == null ? res.status(404).json({ message: "Cannot find User" }) : (res.user = user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
}

module.exports = router;
