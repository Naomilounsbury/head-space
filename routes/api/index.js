const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");
const reactionRoutes = require("./reactionRoutes");
const friendRoutes = require("./friendRoutes");

router.use("/user", userRoutes);
router.use("/thought", thoughtRoutes);
router.use("/thought/:id", reactionRoutes);
router.use("/user/:id", friendRoutes);
module.exports = router;
