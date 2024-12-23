const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require('../models/mongodb/userModel')
const asyncHandler = require("express-async-handler");
const { pushToBlackListTokenFromRedis } = require("../databases/redis/redis");
const RefreshModel = require('../models/mongodb/refreshModel');
const { DateTime } = require("luxon");
const { AES } = require("../classes/AES");
const UserDetailModel = require('../models/mongodb/userDetailModel');
const TransactionModel = require('../models/mongodb/postTransactionModel');

//@desc Register User
//@route POST /api/users/register
//@access public
const register = asyncHandler(async (req,res) => {
    const {username,email,password} = req.body;

    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    
    const userAvailable = await UserModel.findOne({email});
    
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:",hashedPassword);
    const user = await UserModel.create({
        username,
        email,
        password:hashedPassword,
        role:"user",
        vip: 0
    });

    await UserDetailModel.create({
        fullName: "",
        email: email,
        address:"",
        idCard:"",
        phoneNumber:"",
    })

    if(user){
        res.status(201).json({_id: user.id, email: user.email, username: user.username})
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
})


//@desc Login User
//@route POST /api/users/login
//@access private
const login = asyncHandler( async(req,res) => {
    const {email, password} = req.body;
    console.log(email);
    
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.useragent;
    
    const time = String(
        DateTime.now().setZone("Asia/Ho_Chi_Minh").toFormat("yyyy-MM-dd HH:mm:ss")
    );

    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await UserModel.findOne({ email });
    
    
    //compare password with hashedpassword
    if(user && (await bcrypt.compare(password, user.password))) {
        // generate access token
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                    vip: user.vip,
                    role: user.role
                },
            }, process.env.JWT_SECRET_KEY,
            {
                expiresIn: "15m",
                // no need header because JWT default is HS256-JWT
                // header: {
                //     alg: "HS256", 
                //     typ: "JWT"    
                // }
            }
        );
        // generate refresh token

        const refreshToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                    vip: user.vip,
                    role: user.role
                },
            }, process.env.REFRESH_SECRET_KEY,
            {
                expiresIn: "30d",
                // no need header because JWT default is HS256-JWT
                // header: {
                //     alg: "HS256", 
                //     typ: "JWT"    
                // }
            }
        );
        
        
        RefreshModel.create({
            email: user.email,
            username: user.username,
            deviceInfo:{
                ipAddress:ipAddress,
                userAgent: userAgent.browser,
            },
            token: refreshToken,
            time: time
        })


        // 30 * 24 * 60 * 60 * 1000 = 30 days
        res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "None",
            // path: "/"
        });
        res.status(200).json({ 
            accessToken 
        });
    }else{
        res.status(401);
        throw new Error("email or password is not valid")
    }
})


//@desc Current User
//@route POST /api/users/current
//@access private
const current = (req,res) => {
    res.status(200).json(req.user)
}

//@desc Logout User
//@route POST /api/users/logout
//@access public
const logout = asyncHandler(async (req, res) => {
    const {email,token} = req.body;
    const cookie = req.cookies.refreshToken;

    // const updateToken = await UserModel.updateOne(
    //     { email: userEmail }, // find the user by email
    //     { $push: { blackListToken: token } } // push token to blacklist
    // );

    // console.log(updateToken);
    console.log(cookie);
    
    //push access token to black list
    await pushToBlackListTokenFromRedis(email,token,900);
    // remove refresh token in database
    await RefreshModel.findOneAndDelete({token:cookie});
    // remove refresh token in cookie fron client
    res.clearCookie('refreshToken');
    
    res.status(200).json({message:"Log out successful"});
});

//@desc Refresh User
//@route POST /api/users/refresh
//@access private
const refresh = asyncHandler((req,res) => {
    
    // generate access token
    const accessToken = jwt.sign(
        {
            user: {
                username: req.user.username,
                email: req.user.email,
                id: req.user.id,
                role: req.user.role
            },
        }, process.env.JWT_SECRET_KEY,
        {
            expiresIn: "15m",
            // no need header because JWT default is HS256-JWT
            // header: {
            //     alg: "HS256", 
            //     typ: "JWT"    
            // }
        }
    );

    res.status(200).json({
        accessToken
    });
})


//@desc getDetail UserDetal
//@route GET /api/users/auth/getUserDetail
//@access private
const getDetail = asyncHandler(async(req,res)=>{
    const {email} = req.user;

    const userDetail = await UserDetailModel.findOne({email:email});
    res.status(200).json({
        userDetail
    })

})
//@desc updateDetail UserDetal
//@route PUT /api/users/auth/updateUserDetail
//@access private
const updateDetail = asyncHandler(async(req,res)=>{
    const {email} = req.user;
    const {fullName,idCard,address,phoneNumber} = req.body;
    const userDetail = await UserDetailModel.findOneAndUpdate({email:email},{
        fullName: fullName,
        idCard: idCard,
        phoneNumber: phoneNumber,
        address: address
    },{ new: true });
    res.status(200).json({
        userDetail,
    })
})

//@desc adminAuth 
//@route PUT /api/admin/auth
//@access private
const adminAuth = (req,res) => {
    res.status(200).json({
        message:"welcome back admin"
    })
}

//@desc adminAuth 
//@route DELETE /api/admin/auth/deleteTransaction
//@access private
const deleteTransaction = asyncHandler(async(req,res) => {
    const { id } = req.query;
    if (!id) {
        res.status(400);
        throw new Error("Transaction ID is required")
    }
    
    const deletedTransaction = await TransactionModel.findOneAndDelete({ _id: id }).catch(()=>{
        res.status(404);
        throw new Error("Transaction not found")
    })

    if (!deletedTransaction) {
        res.status(404);
        throw new Error("Transaction not found")
    }

    res.status(200).json({
        message: 'Transaction deleted successfully',
    });
})

module.exports = {login,register,current, logout, refresh,getDetail,updateDetail,adminAuth, deleteTransaction}