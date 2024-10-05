const express = require("express");
const router = express.Router();

const { checkTransaction } = require('../controllers/checkTransactionController')

router.route("/checkTransaction").post(checkTransaction);

module.exports = router;
