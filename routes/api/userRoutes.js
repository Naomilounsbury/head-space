const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controller/user");

// /api/pizzas
router.route("/").get(getAllUsers).post(createUser);

// /api/pizzas/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
