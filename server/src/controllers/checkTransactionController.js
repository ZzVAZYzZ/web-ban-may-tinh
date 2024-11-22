const postTransactionModel = require("../models/mongodb/postTransactionModel");
const asyncHandler = require("express-async-handler");
const { AES } = require("../classes/AES");

const checkTransaction = asyncHandler(async (req,res,next) => {
    try{
        const { transactionId, phone } = req.body;

        const aes = new AES();
        const decryptedRequest = {
            transactionId: aes.runDecrypt(transactionId,process.env.AES_KEY),
            phone: aes.runDecrypt(phone,process.env.AES_KEY),
        }
        
        const queryTransaction = await postTransactionModel.findById(decryptedRequest.transactionId);
        
        if(queryTransaction.userInformation.phone===decryptedRequest.phone){
            res.send({
                res:{
                    userInformation: {
                        name:  aes.runEncrypt(queryTransaction.userInformation.name,process.env.AES_KEY) ,
                        phone: aes.runEncrypt(queryTransaction.userInformation.phone,process.env.AES_KEY) ,
                        note: aes.runEncrypt(queryTransaction.userInformation.note,process.env.AES_KEY) ,
                        address: aes.runEncrypt(queryTransaction.userInformation.address,process.env.AES_KEY) 
                    } ,
                    productsInformation: queryTransaction.productsInformation.map((product)=>{
                        return{
                            nameProduct: aes.runEncrypt(product.nameProduct,process.env.AES_KEY),
                            price: aes.runEncrypt(product.price.toString(),process.env.AES_KEY),
                            productId: aes.runEncrypt(product.productId,process.env.AES_KEY),
                            quantity: aes.runEncrypt(product.quantity.toString(),process.env.AES_KEY),
                        }
                    }),
                    amount: aes.runEncrypt(queryTransaction.amount.toString(),process.env.AES_KEY),
                    time: aes.runEncrypt(queryTransaction.time,process.env.AES_KEY)
                },
                status:"success",
                message:"successed check transaction"
            })
        }else{
            
            // res.send({
            //     status:"failed",
            //     message:"failed for checking transaction"
            // })
            res.status(400);
            throw new Error("failed for checking transaction");
        }
        // console.log(queryTransaction);
    }
    catch(err){
        // res.send({
        //     status:"failed",
        //     message:"failed for checking transaction"
        // })
        res.status(400);
        throw new Error("failed for checking transaction");
    }
    
})


module.exports = { checkTransaction }