const express = require("express");
const router = express.Router();

const checkTransactionRoute = require('./checkTransactionRoute/checkTransactionRoute')
const postTransactionRoute = require('./postTransactionRoute/postTransactionRoute')

router.use('/transaction',checkTransactionRoute);
router.use('/transaction',postTransactionRoute);

module.exports = router;
