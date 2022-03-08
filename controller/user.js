const User= require("../models/User");
//TODO GET all users
const userController = {
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thought",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //TODOGET a single user by its _id and populated thought and friend data
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thought",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //TODO POST a new user:

  // example data
  // {
  //   "username": "lernantino",
  //   "email": "lernantino@gmail.com"
  // }

  createUser({ body }, res) {
    User.create({
      username: body.username,
      email: body.email,
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  //TODO: PUT to update a user by its _id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  //TODO: DELETE to remove user by its _id


  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
