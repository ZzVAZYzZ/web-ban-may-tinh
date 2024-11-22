const express = require("express");
const router = express.Router();

const transactionRoute = require('./transactionRoute/transactionRoute')

router.use('/api',transactionRoute)

module.exports = router;
