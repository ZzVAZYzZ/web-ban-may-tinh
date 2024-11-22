const express = require("express");
const { checkTransaction } = require("../../../controllers/checkTransactionController");
const router = express.Router();



router.route("/checkTransaction").post(checkTransaction);

module.exports = router;
