const mongoose = require('mongoose');
const postTransactionModel = require('../models/mongodb/postTransactionModel');
const { connectDb } = require('../databases/mongodb/connectMongo');
require("dotenv").config();

const clearAllData = async () => {
    try {
        await connectDb(); // Kết nối với database
        await postTransactionModel.deleteMany({}); // Xóa tất cả các document trong collection
        console.log('Cleared all data successfully');
    }
    catch (error) {
        console.error('Error clearing data:', error);
        process.exit(1); // Thoát chương trình với mã lỗi
    }
    finally {
        await mongoose.disconnect(); // Ngắt kết nối database
    }
}

clearAllData();