const postTransactionModel = require("../models/mongodb/postTransactionModel");
const { AES } = require("../classes/AES");

const checkTransaction = async (req,res,next) => {
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
                    userInformation: queryTransaction.userInformation,
                    productsInformation: queryTransaction.productsInformation,
                    amount: queryTransaction.amount,
                    time: queryTransaction.time
                },
                status:"success",
                message:"successed check transaction"
            })
        }else{
            
            res.send({
                status:"failed",
                message:"failed for checking transaction"
            })
        }
        console.log(queryTransaction);
    }
    catch(err){
        res.send({
            status:"failed",
            message:"failed for checking transaction"
        })
    }
    
}


module.exports = { checkTransaction }