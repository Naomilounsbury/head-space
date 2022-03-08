//TODO POST to create a reaction stored in a single thought's reactions array field
const { Reaction } = require("../models");
const reactionController = {
  addReaction({ params, body }, res) {
    console.log(params);
    Reaction.create(body)
      .then(({ _id }) => {
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: _id } },
          { new: true }
        );
      })
      .then((dbReactionData) => {
        console.log(dbReactionData);
        if (!dbReactionData) {
          res.status(404).json({ message: "No reaction found with this id!" });
          return;
        }
        res.json(dbReactionData);
      })
      .catch((err) => res.json(err));
  },

  //TODO DELETE to pull and remove a reaction by the reaction's reactionId value
  removeReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.reactionId })
      .then((deletedReaction) => {
        if (!deletedReaction) {
          return res.status(404).json({ message: "No reaction with this id!" });
        }
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: params.reactionId } },
          { new: true }
        );
      })
      .then((dbReactionData) => {
        if (!dbReactionData) {
          res.status(404).json({ message: "No reaction found with this id!" });
          return;
        }
        res.json(dbReactionData);
      })
      .catch((err) => res.json(err));
  },
};
module.exports = reactionController;
