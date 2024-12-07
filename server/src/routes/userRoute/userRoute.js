const express = require("express");
const { login, register, logout, current, refresh } = require("../../controllers/userController");
const { validateAccessToken } = require("../../middlewares/validateAccessToken");
const { validateRefreshToken } = require("../../middlewares/validateRefreshToken");
const router = express.Router();

router.route('/users/login').post(login);
router.route('/users/register').post(register);
router.route('/users/logout').post(logout);
router.route('/users/current').get(validateAccessToken,current);
router.route('/users/refresh').get(validateRefreshToken,refresh);

module.exports = router;
