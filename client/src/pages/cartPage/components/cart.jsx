import React from "react";
import CartIcon from "./cartIcon";
import Line from "./line";
import UserIcon from "./userIcon";
import PaymentIcon from "./paymentIcon";
import FinishIcon from "./finishIcon";
import { useSelector } from "react-redux";
const Cart = () => {
  const step = useSelector(state => state.stepbar.step);
  return (
    <div className=" w-[800px] h-[150px] bg-[#CBFAFF] mt-[54px] mb-[54px] ml-auto mr-auto flex flex-row gap-[14px] items-center justify-center">
      <CartIcon isActive={step?.one} /> <Line isActive={step?.two} />{" "}
      <UserIcon isActive={step?.three} /> <Line isActive={step?.four} />{" "}
      <PaymentIcon isActive={step?.five} /> <Line isActive={step?.six} />{" "}
      <FinishIcon isActive={step?.seven} />
    </div>
  );
};

export default Cart;
