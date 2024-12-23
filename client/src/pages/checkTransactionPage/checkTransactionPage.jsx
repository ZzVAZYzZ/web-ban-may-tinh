import React, { useEffect, useState } from "react";
import searchTransactionIcon from "../../assets/icons/search transaction icon.png";
import searchTransactionImage from "../../assets/images/search transaction image.png";
import searchTransactionNotFoundImage from "../../assets/images/search transaction not found image.png";
import axios from "axios";
import { AES } from "../../classes/AES";
import _ from "lodash";
import TransactionProductCard from "./components/transactionProductCard";
import { useForm } from "react-hook-form";

const CheckTransactionPage = () => {
  const [checkIdTransactionData, setIdCheckTransactionData] = useState("");
  const [checkPhoneTransactionData, setPhoneCheckTransactionData] =
    useState("");
  const aes = new AES();
  const [responseTransactionData, setRespnoseTransactionData] = useState();
  const {
    register,
    formState: { errors },
    trigger,
  } = useForm({
    mode:  'onBlur'
  });

  const handleIdInputChange = (e) => {
    // console.log(e.target.value);
    
    setIdCheckTransactionData(e.target.value);
  };

  const handlePhoneInputChange = (e) => {
    // console.log(e.target.value);
    setPhoneCheckTransactionData(e.target.value);
  };

  const handleCheckTransactionButtonClick = async () => {
    const isValid = await trigger(["id", "phoneNumber"]);
    
    
    if (isValid) {
      checkTransaction(checkIdTransactionData, checkPhoneTransactionData);
    }
  }

  useEffect(()=>{
    console.log(responseTransactionData);
    
  },[responseTransactionData])

  const checkTransaction = (id, phone) => {
      const bodyRequest = {
        transactionId: aes.runEncrypt(id, process.env.REACT_APP_AES_KEY),
        phone: aes.runEncrypt(phone, process.env.REACT_APP_AES_KEY),
      };
      axios
        .post("https://localhost:8000/api/transaction/checkTransaction", bodyRequest)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .then((res) => {
          if (res.status === "success") {
            const decryptedData = {
              transactionId: id,
              res: {
                userInformation: {
                  name: aes.runDecrypt(
                    res.res.userInformation.name,
                    process.env.REACT_APP_AES_KEY
                  ),
                  phone: aes.runDecrypt(
                    res.res.userInformation.phone,
                    process.env.REACT_APP_AES_KEY
                  ),
                  note: aes.runDecrypt(
                    res.res.userInformation.note,
                    process.env.REACT_APP_AES_KEY
                  ),
                  address: aes.runDecrypt(
                    res.res.userInformation.address,
                    process.env.REACT_APP_AES_KEY
                  ),
                },
                productsInformation: res.res.productsInformation.map(
                  (product) => {
                    return {
                      nameProduct: aes.runDecrypt(
                        product.nameProduct,
                        process.env.REACT_APP_AES_KEY
                      ),
                      price: Number(
                        aes.runDecrypt(
                          product.price,
                          process.env.REACT_APP_AES_KEY
                        )
                      ),
                      productId: aes.runDecrypt(
                        product.productId,
                        process.env.REACT_APP_AES_KEY
                      ),
                      quantity: Number(
                        aes.runDecrypt(
                          product.quantity,
                          process.env.REACT_APP_AES_KEY
                        )
                      ),
                    };
                  }
                ),
                amount: Number(
                  aes.runDecrypt(res.res.amount, process.env.REACT_APP_AES_KEY)
                ),
                time: aes.runDecrypt(
                  res.res.time,
                  process.env.REACT_APP_AES_KEY
                ),
              },
              status: "success",
              message: "successed check transaction",
            };
            console.log(decryptedData);

            setRespnoseTransactionData(decryptedData);
          } else {
            setRespnoseTransactionData(res);
          }
        })
        .catch((err) => {
          console.log(err);
          setRespnoseTransactionData({
            status: "failed"
          });
          
        });
  };

  return (
    <div className=" w-full flex flex-col">
      <div className=" flex flex-row m-auto gap-[30px] mt-[88px]">
        <h1 className=" text-[#38D7E7] text-[40px] font-bold">
          TRA CỨU THÔNG TIN ĐƠN HÀNG
        </h1>
        <div className=" flex items-center">
          <img src={searchTransactionIcon} alt="search-transaction-icon" />
        </div>
      </div>

      {!responseTransactionData ? (
        <div className=" w-full flex flex-row justify-center">
          <div className="w-[719px] h-[666px]">
            <img
              src={searchTransactionImage}
              alt="search-transaction-image"
              className=" w-full h-full"
            />
          </div>
          <div className=" flex flex-col mt-[120px] items-center">
            <div className="w-[350px] h-[68px]  border-[#38D7E7] border flex justify-center items-center">
              <input
                type="text"
                className=" outline-none text-[24px]"
                placeholder="Your Id Transaction"
                onInput={(e) => {handleIdInputChange(e)}}
                {...register("id", {
                  required: "ID là bắt buộc",
                  pattern: {
                    value: /^[A-Za-z0-9]+$/, // Chỉ cho phép ký tự chữ và số
                    message: "ID chỉ được chứa chữ cái và số",
                  },
                  minLength: {
                    value: 5,
                    message: "ID phải có ít nhất 5 ký tự",
                  },
                  maxLength: {
                    value: 24,
                    message: "ID không được vượt quá 24 ký tự",
                  },
                })}
              />
            </div>
            {errors.id && <p className=" text-[red]">{errors.id.message}</p>}
            <div className="w-[350px] h-[68px]  border-[#38D7E7] border flex justify-center items-center mt-[15px]">
              <input
                type="tel"
                className=" outline-none text-[24px]"
                placeholder="Your Phone Number"
                onInput={(e) => handlePhoneInputChange(e)}
                {...register("phoneNumber", {
                  required: "Số điện thoại là bắt buộc",
                  pattern: {
                    value: /^[0-9]{10}$/, // Chỉ cho phép 10 số
                    message: "Số điện thoại không hợp lệ, chỉ chứa 10 số",
                  },
                })}
              />
            </div>
            {errors.phoneNumber && (
              <p className=" text-[red]">{errors.phoneNumber.message}</p>
            )}
            <div>
              <button
                className=" w-[230px] h-[68px] bg-[#38D7E7]  text-[#fff] text-[24px] mt-[80px]"
                onClick={handleCheckTransactionButtonClick}
              >
                TRA CỨU
              </button>
            </div>
          </div>
        </div>
      ) : responseTransactionData.status === "success" ? (
        <div className=" w-full h-full flex justify-center mt-[30px]">
          <div className=" w-[800px] h-[650px] border shadow-xl flex items-center justify-center">
            <div className=" w-[600px] h-[550px]  flex flex-col gap-[20px]">
              <div className="w-full h-[40px] bg-[rgb(239,143,170)] rounded-[10px] flex flex-row justify-between">
                <div className="h-full flex items-center ml-[30px]">
                  <h2 className=" text-[18px] font-bold text-[#fff]">
                    Tên khách hàng:
                  </h2>
                </div>
                <div className="h-full flex items-center mr-[30px]">
                  <p className=" text-[16px] font-bold text-[#fff]">
                    {responseTransactionData.res.userInformation.name}
                  </p>
                </div>
              </div>
              <div className="w-full h-[40px] bg-[rgb(239,143,170)] rounded-[10px] flex flex-row justify-between">
                <div className="h-full flex items-center ml-[30px]">
                  <h2 className=" text-[18px] font-bold text-[#fff]">
                    ID đơn hàng của bạn :
                  </h2>
                </div>
                <div className="h-full flex items-center mr-[30px]">
                  <p className=" text-[16px] font-bold text-[#fff]">
                    {responseTransactionData.transactionId}
                  </p>
                </div>
              </div>
              <div className="w-full h-[40px] bg-[rgb(239,143,170)] rounded-[10px] flex flex-row justify-between">
                <div className="h-full flex items-center ml-[30px]">
                  <h2 className=" text-[18px] font-bold text-[#fff]">
                    Địa chỉ nhận hàng:
                  </h2>
                </div>
                <div className="h-full flex items-center mr-[30px]">
                  <p className=" text-[16px] font-bold text-[#fff]">
                    {responseTransactionData.res.userInformation.address}
                  </p>
                </div>
              </div>
              <div className="w-full h-[40px] bg-[rgb(239,143,170)] rounded-[10px] flex flex-row justify-between">
                <div className="h-full flex items-center ml-[30px]">
                  <h2 className=" text-[18px] font-bold text-[#fff]">
                    Số điện thoại liên hệ:
                  </h2>
                </div>
                <div className="h-full flex items-center mr-[30px]">
                  <p className=" text-[16px] font-bold text-[#fff]">
                    {responseTransactionData.res.userInformation.phone}
                  </p>
                </div>
              </div>
              <div className=" w-full h-[250px] bg-[rgb(239,143,170)] rounded-[10px] flex flex-col ">
                <div className="h-[30px] flex items-center ml-[30px] mb-[10px]">
                  <h2 className=" text-[18px] font-bold text-[#fff]">
                    Sản phẩm bạn đã đặt:
                  </h2>
                </div>
                <div
                  className={
                    responseTransactionData.res.productsInformation.length <= 2
                      ? "h-[200px] ml-[45px]"
                      : "h-[200px] ml-[45px] overflow-y-scroll"
                  }
                >
                  {_.map(
                    responseTransactionData.res.productsInformation,
                    (product, key) => {
                      return (
                        <TransactionProductCard
                          productName={product.nameProduct}
                          productId={product.productId}
                          quantity={product.quantity}
                          productPrice={product.price}
                          key={key}
                        />
                      );
                    }
                  )}
                </div>
              </div>
              <div className="w-full h-[40px] bg-[rgb(239,143,170)] rounded-[10px] flex flex-row justify-between">
                <div className="h-full flex items-center ml-[30px]">
                  <h2 className=" text-[18px] font-bold text-[#fff]">
                    Tổng tiền:
                  </h2>
                </div>
                <div className="h-full flex items-center mr-[30px]">
                  <p className=" text-[16px] font-bold text-[#fff]">
                    {responseTransactionData.res.amount.toLocaleString()} VND
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className=" w-full h-full flex justify-center mt-[30px]">
            <div className=" w-[800px] h-[650px] border shadow-xl flex items-center justify-center">
              <div className=" w-[588px] h-[384px] flex flex-col justify-between">
                <div>
                  <h1 className=" text-center text-[38px]">
                    Không tìm thấy đơn hàng của bạn!
                  </h1>
                </div>
                <div>
                  <img
                    src={searchTransactionNotFoundImage}
                    alt="not-found-image"
                    className=" m-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckTransactionPage;
