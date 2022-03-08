const router = require("express").Router();
const { addFriend, removeFriend } = require("../../controller/friend");

router.route("/friends").post(addFriend);

router.route("friends/:friendId").delete(removeFriend);

module.exports = router;
