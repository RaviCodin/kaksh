const express = require("express");
const { createKaksh } = require("../controlers/kakshControler");

const router = express.Router();

router.route("/create").post(createKaksh)



module.exports = router;
