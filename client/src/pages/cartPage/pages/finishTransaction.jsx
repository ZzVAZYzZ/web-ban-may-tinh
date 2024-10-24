import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postTransaction } from "../../../redux/API/postTransactionSlice";
import { AES } from "../../../classes/AES";

const FinishTransaction = () => {
  const [transactionState, setTransactionState] = useState("pending");
  const userInformation = useSelector((state) => state.user.userInformation);
  const amount = useSelector((state) => state.cart.amount);
  const cardInformation = useSelector((state) => state.user.cardInformation);
  const productsInformation = useSelector((state) => state.cart.cart);
  const paymentMethod = useSelector((state) => state.user.paymentMethod);
  const response = useSelector(state=>state.postTransaction.response);
  const reduxDispatch = useDispatch();
  const aes = new AES();

  useEffect(() => {
    const payload = {
      userInformation: {
        name: aes.runEncrypt(userInformation.name, process.env.REACT_APP_AES_KEY),
        phone: aes.runEncrypt(userInformation.phone, process.env.REACT_APP_AES_KEY),
        note: aes.runEncrypt(userInformation.note, process.env.REACT_APP_AES_KEY),
        address: aes.runEncrypt(userInformation.address, process.env.REACT_APP_AES_KEY),
      },
      amount: aes.runEncrypt(String(amount), process.env.REACT_APP_AES_KEY),
      cardInformation: {
        cardNumber: aes.runEncrypt(
          cardInformation.cardNumber,
          process.env.REACT_APP_AES_KEY
        ),
        expirtTime: aes.runEncrypt(
          cardInformation.expirtTime,
          process.env.REACT_APP_AES_KEY
        ),
        CSC: aes.runEncrypt(cardInformation.CSC, process.env.REACT_APP_AES_KEY),
        cardHolder: aes.runEncrypt(
          cardInformation.cardHolder,
          process.env.REACT_APP_AES_KEY
        ),
      },
      productsInformation: [],
      paymentMethod: aes.runEncrypt(
        paymentMethod,
        process.env.REACT_APP_AES_KEY
      ),
    };
    if (
      userInformation.name !== "" &&
      userInformation.address !== "" &&
      userInformation.phone !== "" &&
      amount !== 0 &&
      cardInformation.cardNumber !== "" &&
      cardInformation.expirtTime !== "" &&
      cardInformation.cardHolder !== "" &&
      cardInformation.CSC !== "" &&
      productsInformation.length !== 0
    ) {
        productsInformation.forEach((product) => {
            payload.productsInformation.push({
              nameProduct: aes.runEncrypt(product.productName, process.env.REACT_APP_AES_KEY),
              price: aes.runEncrypt(String(product.price), process.env.REACT_APP_AES_KEY),
              productId: aes.runEncrypt(product.productId, process.env.REACT_APP_AES_KEY),
              quantity: aes.runEncrypt(String(product.quantity), process.env.REACT_APP_AES_KEY),
            });
        });
      reduxDispatch(postTransaction(payload));
    }
  }, []);

  useEffect(() => {
    setTransactionState(response?.status||"pending")
  }, [response]);

  return (
    <div className=" w-[500px] m-auto flex flex-col gap-6 items-center">
      <div
        className={
          transactionState === "pending"
            ? " w-[200px] h-[200px] bg-[#b9bbb9] rounded-full border shadow-xl"
            : transactionState === "success"
            ? " w-[200px] h-[200px] bg-[#35C850] rounded-full border shadow-xl"
            : " w-[200px] h-[200px] bg-[#f94444] rounded-full border shadow-xl"
        }
      ></div>
      <div className=" text-center text-[18px]">
        {transactionState === "pending"
          ? "ĐANG THỰC HIỆN THANH TOÁN"
          : transactionState === "success"
          ? "BẠN ĐÃ ĐẶT HÀNG THÀNH CÔNG!"
          : "THANH TOÁN THẤT BẠI"}
      </div>
      <div className=" w-full h-[100px] bg-[#CBFAFF] text-[20px] flex justify-center items-center font-bold mb-[30px]">
        {
            transactionState === "pending" 
                ? "Chờ trong giây lát"
                : transactionState === "success"
                ? `ID ĐƠN HÀNG: ${response?.transactionId}`
                : "Thất Bại"
        }
      </div>
    </div>
  );
};

export default FinishTransaction;
