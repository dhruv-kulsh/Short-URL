const express = require("express");
const {handleUserSignUp, handleUSerLogin} = require("../controller/user");

const router = express.Router();

router.route('/').post(handleUserSignUp);
router.route('/login').post(handleUSerLogin);

module.exports = router;