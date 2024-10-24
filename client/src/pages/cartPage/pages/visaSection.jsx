import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import secureImage from "../../../assets/images/secure-image.png";
import {Link} from "react-router-dom"
import { useDispatch } from "react-redux";
import { setCardInformation } from "../../../redux/features/counter/userSlice";
import { setStep } from "../../../redux/processes/stepbarSlice";

const VisaSection = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const reduxDispatch = useDispatch();

  const nextStepBar = () => {
    const step = {
        one: true,
        two: true,
        three: true,
        four: true,
        five: true,
        six: true,
        seven: false
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

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleConfirmClick = () => {
    const cardInformation = {
        cardNumber:state.number,
        expirtTime:state.expiry,
        cardHolder:state.name,
        CSC:state.cvc,
    }
    nextStepBar();
    reduxDispatch(setCardInformation(cardInformation))
  }


  return (
    <div className=" w-full flex items-center mt-[50px] flex-col">
      <div className=" flex flex-row">
        <div className="w-[800px] flex flex-col gap-5 mt-[50px]">
          <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
          />
          <form className="w-[800px] flex flex-col shadow-xl border justify-center">
            <label className=" w-[750px] m-auto mt-[50px]">
              <div>
                Số thẻ <span className="text-[red] font-bold">*</span> :
              </div>
              <div className=" w-full h-[50px] border flex justify-center">
                <input
                  className=" w-[700px] h-full outline-none"
                  type="text"
                  name="number"
                  value={state.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
            </label>

            <label className=" w-[750px] m-auto">
              <div className=" flex flex-row justify-between">
                <label className=" w-[360px]">
                  <div>
                    Tháng/ năm hết hạn{" "}
                    <span className="text-[red] font-bold">*</span> :
                  </div>
                  <div className=" w-full h-[50px] border flex justify-center">
                    <input
                      className=" w-[310px] h-full outline-none"
                      type="text"
                      name="expiry"
                      value={state.expiry}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                    />
                  </div>
                </label>
                <label className=" w-[360px]">
                  <div>
                    CVC <span className="text-[red] font-bold">*</span> :
                  </div>
                  <div className=" w-full h-[50px] border flex justify-center">
                    <input
                      className=" w-[310px] h-full outline-none"
                      type="text"
                      name="cvc"
                      value={state.cvc}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                    />
                  </div>
                </label>
              </div>
            </label>

            <label className=" w-[750px] m-auto mb-[50px]">
              <div>
                Tên in trên thẻ <span className="text-[red] font-bold">*</span>{" "}
                :
              </div>
              <div className=" w-full h-[50px] border flex justify-center">
                <input
                  className=" w-[700px] h-full outline-none"
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
            </label>
            <div className=" w-[750px] m-auto mb-[50px] flex justify-end">
                <Link to="/cart/check-bill-section" onClick={handleConfirmClick} className=" w-[180px] h-[45px] border bg-[#38D7E7] text-[#fff] flex justify-center items-center text-[24px]">XÁC NHẬN</Link>
            </div>
          </form>
          
        </div>
        <div className=" w-[500px]">
          <img src={secureImage} alt="secure-image" className=" w-full" />
        </div>
      </div>
      <div className=" mt-[25px]">
        <Link to="/cart/user-information-section" className='w-[360px] h-[70px] text-[#FFF] bg-[#EE376B] text-[24px] border border-[#EE376B] flex justify-center items-center mb-[35px] mt-[14px]' onClick={prevStepBar}>Quay lại trang thông tin</Link>
      </div>
    </div>
  );
};

export default VisaSection;
