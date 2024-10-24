import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPaymentMethod } from '../../../redux/features/counter/userSlice';
import { Link } from "react-router-dom";
import { setStep } from "../../../redux/processes/stepbarSlice";

const PaymentMethodSection = () => {
  const amount = useSelector((state) => state.cart.amount);
  const userInformation = useSelector((state) => state.user.userInformation);
  const [paymentMethod,setPaymentMethodClient] = useState("");
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

  const radioChangeEvent = (e) => {
    setPaymentMethodClient(e.target.value);
    reduxDispatch(setPaymentMethod(e.target.value));
  }

  return (
    <div className=" w-[800px] m-auto mb-[20px] flex flex-col">
      <h1 className=" text-[28px] font-bold mb-[10px]">Thông tin đặt hàng</h1>
      <ul>
        <li className="  ml-[30px] flex flex-row ">
          <div className="w-[200px] text-[18px]">Khách hàng:</div>
          <div className=" text-[18px]">{userInformation.name}</div>
        </li>
        <li className="  ml-[30px] flex flex-row ">
          <div className="w-[200px] text-[18px]">Số điện thoại:</div>
          <div className=" text-[18px]">{userInformation.phone}</div>
        </li>
        <li className="  ml-[30px] flex flex-row ">
          <div className="w-[200px] text-[18px]">Địa chỉ nhận hàng:</div>
          <div className=" text-[18px]">{userInformation.address}</div>
        </li>
        <li className="  ml-[30px] flex flex-row ">
          <div className="w-[200px] text-[18px]">Tổng tiền:</div>
          <div className=" text-[18px]">{amount?.toLocaleString()} VND</div>
        </li>
      </ul>
      <h1 className=" text-[28px] font-bold mb-[10px]">
        Chọn hình thức thanh toán
      </h1>
      <ul className=" flex flex-col gap-4">
        <li className="ml-[30px] flex items-center gap-5">
          <input
            type="radio"
            name="payment method"
            value="COD"
            id="cod"
            className=" w-[20px] h-[20px]"
            checked={paymentMethod === "COD"}
            onChange={(e)=>radioChangeEvent(e)}
          />
          <svg width="37" height="36" viewBox="0 0 37 36" fill="none">
            <path
              d="M12.1978 0H34.967V17.5385H31.7143V3.69231H28.4615V14.064L23.5824 11.2948L18.7033 14.064V3.69231H15.4506V13.8462H12.1978V0ZM21.956 3.69231V8.08985L23.5824 7.16677L25.2088 8.08985V3.69231H21.956ZM13.7185 20.7692C13.4514 20.7684 13.1869 20.8274 12.9399 20.9427C12.6929 21.058 12.4684 21.2274 12.2791 21.4412L8.94506 25.2258V32.3077H18.0967L27.5345 29.6308L33.2789 26.8468C33.4745 26.7267 33.6242 26.5289 33.6993 26.2913C33.7744 26.0537 33.7696 25.7929 33.6857 25.5591C33.6019 25.3253 33.4449 25.1348 33.245 25.0242C33.045 24.9137 32.8162 24.8908 32.6023 24.96L32.5698 24.9692L22.1415 27.6923H16.2637V24H21.3462C21.7236 24 22.0855 23.8298 22.3524 23.5269C22.6193 23.2239 22.7692 22.813 22.7692 22.3846C22.7692 21.9562 22.6193 21.5453 22.3524 21.2424C22.0855 20.9394 21.7236 20.7692 21.3462 20.7692H13.7185ZM26.0008 22.896L31.7777 21.3877C32.393 21.204 33.0372 21.1829 33.6607 21.3259C34.2843 21.4688 34.8708 21.7721 35.375 22.2124C35.8793 22.6527 36.288 23.2183 36.5696 23.8659C36.8513 24.5134 36.9986 25.2255 37 25.9477C36.9993 26.8243 36.7839 27.6835 36.3778 28.4291C35.9717 29.1747 35.3909 29.7774 34.7003 30.1698L34.6564 30.1957L28.5738 33.1403L18.4967 36H0V22.6154H6.64536L9.98268 18.8271C10.4744 18.2708 11.0578 17.8299 11.6997 17.5296C12.3415 17.2294 13.0291 17.0755 13.7233 17.0769H21.3462C21.9982 17.0768 22.6431 17.2316 23.2394 17.5312C23.8357 17.8308 24.3701 18.2686 24.8085 18.8166C25.2468 19.3646 25.5794 20.0106 25.7847 20.7132C25.99 21.4157 26.0637 22.1592 26.0008 22.896ZM5.69231 26.3077H3.25275V32.3077H5.69231V26.3077Z"
              fill="black"
            />
          </svg>
          <p className=" text-[18px] font-bold">Thanh toán khi giao hàng (COD)</p>
        </li>
        <li className="  ml-[30px] flex flex-row items-center gap-5">
          <input
            type="radio"
            name="payment method"
            value="VISA"
            className=" w-[20px] h-[20px]"
            checked={paymentMethod === "VISA"}
            onChange={(e)=>radioChangeEvent(e)}
          />
          <svg
            width="37"
            height="31"
            viewBox="0 0 37 31"
            fill="none"
          >
            <path
              d="M0 5.16667C0 3.79638 0.487275 2.48222 1.35463 1.51328C2.22199 0.544343 3.39837 0 4.625 0H32.375C33.6016 0 34.778 0.544343 35.6454 1.51328C36.5127 2.48222 37 3.79638 37 5.16667V7.75H0V5.16667ZM0 12.9167V25.8333C0 27.2036 0.487275 28.5178 1.35463 29.4867C2.22199 30.4557 3.39837 31 4.625 31H32.375C33.6016 31 34.778 30.4557 35.6454 29.4867C36.5127 28.5178 37 27.2036 37 25.8333V12.9167H0ZM6.9375 18.0833H9.25C9.86331 18.0833 10.4515 18.3555 10.8852 18.84C11.3189 19.3244 11.5625 19.9815 11.5625 20.6667V23.25C11.5625 23.9351 11.3189 24.5922 10.8852 25.0767C10.4515 25.5612 9.86331 25.8333 9.25 25.8333H6.9375C6.32419 25.8333 5.73599 25.5612 5.30232 25.0767C4.86864 24.5922 4.625 23.9351 4.625 23.25V20.6667C4.625 19.9815 4.86864 19.3244 5.30232 18.84C5.73599 18.3555 6.32419 18.0833 6.9375 18.0833Z"
              fill="black"
            />
          </svg>
          <p className=" text-[18px] font-bold">Thanh toán trực tuyến (VISA)</p>
        </li>
      </ul>
      <div className=' m-auto'>
            {
                paymentMethod==="COD"?
                    (
                        <Link to="/cart/check-bill-section" className='w-[360px] h-[70px] text-[#FFF] text-[20px] bg-[#EE376B] border border-[#EE376B] flex justify-center items-center mb-[35px] mt-[14px]' onClick={nextStepBar}>THANH TOÁN NGAY</Link>
                    )
                    : paymentMethod==="VISA"?
                    (
                        <Link to="/visa-section" className='w-[360px] h-[70px] text-[#FFF] text-[20px] bg-[#EE376B] border border-[#EE376B] flex justify-center items-center mb-[35px] mt-[14px]'>THANH TOÁN NGAY</Link>
                    )
                    :
                    (
                      <Link to="" className='w-[360px] h-[70px] text-[#FFF] text-[20px] bg-[#EE376B] border border-[#EE376B] flex justify-center items-center mb-[35px] mt-[14px]'>THANH TOÁN NGAY</Link>
                    )
            }
                
                <Link to="/cart/user-information-section" className='w-[360px] h-[70px] text-[#EE376B] text-[24px] border border-[#EE376B] flex justify-center items-center mb-[35px] mt-[14px]' onClick={prevStepBar}>Quay lại trang thông tin</Link>
     </div>
    </div>
  );
};

export default PaymentMethodSection;
