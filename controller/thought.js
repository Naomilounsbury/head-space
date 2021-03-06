const User = require("../models/User");
const Thought = require("../models/Thought");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find()
      // .populate({
      //   path: "user",
      //   select: "-__v",
      // })
      // .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      // .populate({
      //   path: "user",
      //   select: "-__v",
      // })
      //.select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // example data
  // {
  //   "thoughtText": "Here's a cool thought...",
  //   "username": "lernantino",
  //   "userId": "5edff358a0fcb779aa7b118b"
  // }
  createThought({ params, body }, res) {
    //before the create find the user based on the user id in the body
    //use a get then use that username to add it to the create
    Thought.create(body)
      .then((dbThoughtData) => {
        console.log(params.userId);
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thought: dbThoughtData._id } },
          { new: true },
          console.log(params.userId)
        );
      })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "No thoughts found! Your brain is empty." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
