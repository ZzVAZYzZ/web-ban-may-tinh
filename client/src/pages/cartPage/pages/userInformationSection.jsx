import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName , setUserAddress , setUserNote , setUserPhone } from '../../../redux/features/counter/userSlice';
import { Link } from 'react-router-dom';
import { setStep } from '../../../redux/processes/stepbarSlice';

const UserInformationSection = () => {
    const amount = useSelector(state=>state.cart.amount);
    const userInformation = useSelector(state=>state.user.userInformation);
    const reduxDispatch = useDispatch();
    const [isFill,setIsFill] = useState(false);

    const nextStepBar = () => {
        const step = {
            one: true,
            two: true,
            three: true,
            four: true,
            five: true,
            six: false,
            seven: false
        }
        reduxDispatch(setStep(step));
    }

    const prevStepBar = () => {
        const step = {
            one: true,
            two: false,
            three: false,
            four: false,
            five: false,
            six: false,
            seven: false
        }
        reduxDispatch(setStep(step));
    }

    const handleInformationChange = (e,field) => {
        switch (field) {
            case "name":
                reduxDispatch(setUserName(e.target.value));
                break;
            case "phone":
                reduxDispatch(setUserPhone(e.target.value));
                break;
            case "address":
                reduxDispatch(setUserAddress(e.target.value));
                break;
            case "note":
                reduxDispatch(setUserNote(e.target.value));
                break;
        
            default:
                break;
        }
    }

    const handleCheckIsFill = (event) => {
        
        
        if(userInformation.phone===""||userInformation.name===""||userInformation.address===""){
            event.preventDefault();
            setIsFill(false);
        }else{
            nextStepBar()
            setIsFill(true);
        }
    }

    useEffect(()=>{
        console.log(userInformation);
        
    },[userInformation])

    return (
        <>
            <h2 className=' text-[24px] text-center mb-[28px] font-bold'>Thông tin khách mua hàng</h2>
            <div className=' w-[600px] m-auto flex flex-col gap-[6px] mb-[28px]'>
                <div className=' w-full flex justify-between flex-row'>
                    <div className=' w-[295px] h-[50px] flex justify-center border-[#EE376B] border rounded-[8px]'>
                        <input type="text" name='full name' required placeholder='Nhập họ tên' className=' w-[250px] text-[20px] h-full outline-none ' defaultValue={userInformation.name} onChange={(e)=>handleInformationChange(e,"name")}/>
                    </div>
                    <div className=' w-[295px] h-[50px] flex justify-center border-[#EE376B] border rounded-[8px]'>
                        <input type="text" name='number phone' required placeholder='Nhập số điện thoại' className=' w-[250px] text-[20px] h-full outline-none ' defaultValue={userInformation.phone} onChange={(e)=>handleInformationChange(e,"phone")}/>
                    </div>
                </div>
                <div className=' w-full h-[50px] flex justify-center border-[#EE376B] border rounded-[8px]'>
                    <input type="text" name='address' required placeholder='Địa chỉ nhận hàng' className=' w-[540px] text-[20px] h-full outline-none ' defaultValue={userInformation.address} onChange={(e)=>handleInformationChange(e,"address")}/>
                </div>
                <div className=' w-full h-[150px] flex justify-center border-[#EE376B] border rounded-[8px]'>
                    <textarea type="text" name='note' placeholder='Lưu ý,yêu cầu khác(không bắt buộc):' className=' w-[540px] text-[20px] h-full outline-none ' defaultValue={userInformation.note} onChange={(e)=>handleInformationChange(e,"note")}/>
                </div>
                <div className=' w-full  flex justify-between  mt-[28px]'>
                    <h2 className=' text-[20px] font-bold'>Tổng Tiền:</h2>
                    <h2 className=' text-[20px] font-bold'>{amount?.toLocaleString()} VND</h2>
                </div>
            </div>
            <div className=' m-auto'>
                <Link to="/cart/payment-method-section" className='w-[360px] h-[70px] text-[#FFF] text-[20px] bg-[#EE376B] border border-[#EE376B] flex justify-center items-center mb-[35px] mt-[14px]' onClick={(e)=>handleCheckIsFill(e)}>THÊM PHƯƠNG THỨC THANH TOÁN</Link>
                <Link to="/cart" className='w-[360px] h-[70px] text-[#EE376B] text-[24px] border border-[#EE376B] flex justify-center items-center mb-[35px] mt-[14px]' onClick={prevStepBar}>Quay lại giỏ hàng</Link>
            </div>
        </>
        
    );
}

export default UserInformationSection;
