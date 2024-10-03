const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userInformation: {
        name: {type: String, required: true},
        phone: {type: String, required: true},
        note: {type: String, required: true},
        address: {type: String, required: true},
    },
    amount: {type: Number, required: true},
    cardInformation: {
        cardNumber: {type: String, required: true},
        expirtTime: {type: String, required: true},
        CSC: {type: String, required: true},
        cardHolder: {type: String, required: true},
    },
    productsInformation: {type: Array, required: true},
    time: {type: String, required: true},
});

module.exports = mongoose.model("postTransactionModel", schema);