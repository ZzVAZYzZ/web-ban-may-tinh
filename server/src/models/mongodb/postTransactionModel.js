const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userInformation: {
        name: {type: String, required: true},
        phone: {type: String, required: true},
        note: {type: String, required: false},
        address: {type: String, required: true},
    },
    amount: {type: Number, required: true},
    cardInformation: {
        cardNumber: {type: String, required: false},
        expirtTime: {type: String, required: false},
        CSC: {type: String, required: false},
        cardHolder: {type: String, required: false},
    },
    productsInformation: {type: Array, required: true},
    paymentMethod: {type: String, required: true},
    time: {type: String, required: true},
});

module.exports = mongoose.model("postTransactionModel", schema);