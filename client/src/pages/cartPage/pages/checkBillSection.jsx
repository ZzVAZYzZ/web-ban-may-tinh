import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setStep } from "../../../redux/processes/stepbarSlice";

const CheckBillSection = () => {
  const userInformation = useSelector((state) => state.user.userInformation);
  const amount = useSelector((state) => state.cart.amount);
  const paymentMethod = useSelector(state => state.user.paymentMethod)
  const cardInformation = useSelector(state => state.user.cardInformation)

  const reduxDispatch = useDispatch();

  const nextStepBar = () => {
    const step = {
        one: true,
        two: true,
        three: true,
        four: true,
        five: true,
        six: true,
        seven: true
    }
    reduxDispatch(setStep(step));
}

const prevStepBar = () => {
    const step = {
        one: true,
        two: true,
        three: true,
        four: false,
        five: false,
        six: false,
        seven: false
    }
    reduxDispatch(setStep(step));
}

  return (
    <div className=" w-[800px] m-auto mb-[20px] flex flex-col items-center">
      <h1 className=" text-[28px] font-bold mb-[10px]">Mời bạn xác nhận lại thông tin đặt hàng</h1>
      <ul>
        <li className="  ml-[30px] flex flex-row ">
          <div className="w-[300px] text-[18px]">Khách hàng:</div>
          <div className=" text-[18px]">{userInformation.name}</div>
        </li>
        <li className="  ml-[30px] flex flex-row ">
          <div className="w-[300px] text-[18px]">Số điện thoại:</div>
          <div className=" text-[18px]">{userInformation.phone}</div>
        </li>
        <li className="  ml-[30px] flex flex-row ">
          <div className="w-[300px] text-[18px]">Địa chỉ nhận hàng:</div>
          <div className=" text-[18px]">{userInformation.address}</div>
        </li>
        <li className="  ml-[30px] flex flex-row ">
          <div className="w-[300px] text-[18px]">Tổng tiền:</div>
          <div className=" text-[18px]">{amount?.toLocaleString()} VND</div>
        </li>
        <li className="  ml-[30px] flex flex-row ">
          <div className="w-[300px] text-[18px]">Phương thức thanh toán:</div>
          {
            paymentMethod==="COD"?
              (
                <div className=" text-[18px]">{paymentMethod}</div>
              ):(
                <div className=" text-[18px]">{paymentMethod} - {cardInformation?.cardNumber}</div>
              )
          }
          
        </li>
      </ul>
      <Link to="/cart/finish-transaction" className='w-[360px] h-[70px] text-[#FFF] text-[20px] bg-[#EE376B] border border-[#EE376B] flex justify-center items-center mb-[15px] mt-[14px]' onClick={nextStepBar}>THANH TOÁN NGAY</Link>
      <Link to="/cart/user-information-section" className='w-[360px] h-[70px] text-[#EE376B] text-[24px] border border-[#EE376B] flex justify-center items-center mb-[35px] mt-[14px]' onClick={prevStepBar}>Quay lại trang thông tin</Link>
    </div>
  );
};

export default CheckBillSection;
