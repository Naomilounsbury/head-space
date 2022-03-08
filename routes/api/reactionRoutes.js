const router = require("express").Router();
const { addReaction, removeReaction } = require("../../controller/reaction");

router.route("/reactions").post(addReaction);

router.route("reactions/:id").delete(removeReaction);

module.exports = router;
