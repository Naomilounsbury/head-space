//TODO POST to add a new friend to a user's friend list
const { User } = require("../models");

const friendController = {
  createFriend({ params, body }, res) {
    // User.create(body)
    // .then((dbFriendData) => {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )

      .then((dbFriendData) => res.json(dbFriendData))
      .catch((err) => res.json(err));
  },

  //TODO DELETE to remove a friend from a user's friend list

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbFriendData) => {
        if (!dbFriendData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbFriendData);
      })

      .catch((err) => res.json(err));
  },
};
module.exports = friendController;
