const express = require("express");
const { login, register, logout, current, refresh, getDetail, updateDetail, adminAuth, deleteTransaction } = require("../../controllers/userController");
const { validateAccessToken } = require("../../middlewares/validateAccessToken");
const { validateRefreshToken } = require("../../middlewares/validateRefreshToken");
const { auth } = require("../../middlewares/auth");
const router = express.Router();

router.route('/users/login').post(login);
router.route('/users/register').post(register);
router.route('/users/logout').post(logout);
router.route('/users/current').get(validateAccessToken,current);
router.route('/users/refresh').get(validateRefreshToken,refresh);


router.route('/users/auth').get(validateAccessToken,auth(["user"]));
router.route('/users/auth/getUserDetail').get(validateAccessToken,auth(["user"]),getDetail);
router.route('/users/auth/updateUserDetail').put(validateAccessToken,auth(["user"]),updateDetail);
router.route('/admin/auth').get(validateAccessToken,auth(["admin"]),adminAuth);
router.route('/admin/auth/deleteTransaction').delete(validateAccessToken,auth(["admin"]),deleteTransaction);
module.exports = router;
