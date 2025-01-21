const passport = require("passport");
const { googleAuth } = require("../controllers/authController");

const router = require("express").Router();

router.get("/google/callback", (req, res) => {
  res.send("Hello Worldkk!");
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

module.exports = router;
