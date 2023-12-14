const router = require("express").Router();
const apiUsers = require("./users");
const apiDogs = require("./dogs");
const apiEduc = require("./educators");

router.use("/users", apiUsers);
router.use("/dogs", apiDogs);
router.use("/educators", apiEduc);


module.exports = router;
