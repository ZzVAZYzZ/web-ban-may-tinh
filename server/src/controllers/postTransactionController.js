const { AES } = require("../classes/AES");
const { DateTime } = require("luxon");
const postTransactionModel = require("../models/mongodb/postTransactionModel");

const postTransaction = async (req, res, next) => {
  const { userInformation, amount, cardInformation, productsInformation, paymentMethod } =
    req.body;
  const time = String(
    DateTime.now().setZone("Asia/Ho_Chi_Minh").toFormat("yyyy-MM-dd HH:mm:ss")
  );

  const aes = new AES();
  const decryptedTransaction = {
    userInformation: {
      name: aes.runDecrypt(userInformation.name, process.env.AES_KEY),
      phone: aes.runDecrypt(userInformation.phone, process.env.AES_KEY),
      note: aes.runDecrypt(userInformation.note, process.env.AES_KEY),
      address: aes.runDecrypt(userInformation.address, process.env.AES_KEY),
    },
    amount: aes.runDecrypt(amount, process.env.AES_KEY),
    cardInformation: {},
    productsInformation: [],
    paymentMethod: aes.runDecrypt(paymentMethod, process.env.AES_KEY),
    time: time,
  };

  if(cardInformation!==undefined&&aes.runDecrypt(paymentMethod, process.env.AES_KEY)==="VISA"){
    decryptedTransaction.cardInformation = {
      cardNumber: aes.runDecrypt(
        cardInformation.cardNumber,
        process.env.AES_KEY
      ),
      expirtTime: aes.runDecrypt(
        cardInformation.expirtTime,
        process.env.AES_KEY
      ),
      CSC: aes.runDecrypt(cardInformation.CSC, process.env.AES_KEY),
      cardHolder: aes.runDecrypt(
        cardInformation.cardHolder,
        process.env.AES_KEY
      ),
    }
  }

  productsInformation.forEach((product) => {
    decryptedTransaction.productsInformation.push({
      nameProduct: aes.runDecrypt(product.nameProduct, process.env.AES_KEY),
      price: Number(aes.runDecrypt(product.price, process.env.AES_KEY)),
      productId: aes.runDecrypt(product.productId, process.env.AES_KEY),
      quantity: Number(aes.runDecrypt(product.quantity, process.env.AES_KEY)),
    });
  });

  const savedTransaction = await postTransactionModel.create(decryptedTransaction);

  const responseData = {
    time: time,
    status: "success",
    transactionId: savedTransaction._id,
  };
  // console.log(decryptedTransaction);
  res.send({
    time: aes.runEncrypt(responseData.time, process.env.AES_KEY),
    status: aes.runEncrypt(responseData.status, process.env.AES_KEY),
    transactionId: aes.runEncrypt(
      responseData.transactionId.toString(),
      process.env.AES_KEY
    ),
  });
};

module.exports = { postTransaction };
