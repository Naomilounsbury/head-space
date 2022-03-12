//TODO POST to create a reaction stored in a single thought's reactions array field
const { ReactionSchema, Thought } = require("../models");
const reactionController = {
  addReaction({ params, body }, res) {
    console.log(params.id);
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { reactions: body } },
      { new: true }
    )
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
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )

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
