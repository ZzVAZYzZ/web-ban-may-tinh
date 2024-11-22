const express = require("express");
const { postTransaction } = require("../../../controllers/postTransactionController");
const router = express.Router();



router.route("/postTransaction").post(postTransaction);

module.exports = router;
