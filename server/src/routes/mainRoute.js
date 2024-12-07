const express = require("express");
const router = express.Router();

const transactionRoute = require('./transactionRoute/transactionRoute')
const userRoute = require('./userRoute/userRoute')

router.use('/api',transactionRoute)
router.use('/api',userRoute)

module.exports = router;
