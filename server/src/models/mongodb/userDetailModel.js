const mongoose = require("mongoose");

const schema = mongoose.Schema({
    fullName: {
        type: String,
        required: [false,"please add the user name"],
    },
    email: {
        type: String,
        required: [true,"please add the user email address"],
        unique: [true,"Email address already taken"],
    },
    address: {
        type: String,
        required: [false,"please add the address"],
    },
    idCard: {
        type: String,
        required: [false,"please add the id card"],
    },
    phoneNumber: {
        type: String,
        required: [false,"please add the phone number"],
    }
})

module.exports = mongoose.model("userDetails", schema);