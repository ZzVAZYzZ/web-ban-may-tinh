import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import ProductCart from '../components/productCart';
import { setStep } from '../../../redux/processes/stepbarSlice';

const CartSection = () => {
    const cart = useSelector((state) => state.cart.cart);
    const amount = useSelector((state)=>state.cart.amount)
    const reduxDispatch = useDispatch();

    const nextStepBar = () => {
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

    useEffect(() => {
        console.log(cart);
        
    }, [cart]);

    return (
        <>
            <div>
                    {
                        cart.length>0?(
                            <div className=' w-full flex flex-col justify-center items-center mb-[55px]'>
                                <div className={cart.length>1?' h-[270px] overflow-y-scroll':"h-[270px]"}>
                                    {cart.map((product,key)=>{
                                        return <ProductCart product={product} key={key}/>
                                    })}
                                </div>
                                <hr className=' w-[700px] border-[#EE376B]'/>
                                <div className=' w-[700px] flex flex-row justify-between mt-[22px]'>
                                    <div className=' font-bold text-[24px]'>Tổng tiền:</div>
                                    <div className=' font-bold text-[24px]'>{amount?.toLocaleString()} VND</div>
                                </div>
                            </div>
                        ):(
                            <div className=' text-[#EE376B] text-[20px] w-full flex justify-center mb-[53px] font-bold'>
                                Giỏ hàng của bạn đang trống!
                            </div>
                        )
                    }
                </div>
                <div className=' flex justify-center items-center flex-col'>
                    {
                        cart.length>0?(
                            <>
                                <Link onClick={nextStepBar} to="/cart/user-information-section" className='w-[360px] h-[70px] text-[#FFF] text-[24px] bg-[#EE376B] border border-[#EE376B] flex justify-center items-center mb-[35px] mt-[14px]'>ĐẶT HÀNG NGAY</Link>
                            </>
                        ):(
                            <></>
                        )
                    }
                    <Link to="/" onClick={prevStepBar} className='w-[360px] h-[70px] text-[#EE376B] text-[24px] border border-[#EE376B] flex justify-center items-center mb-[35px] mt-[14px]'>Tiếp tục mua sắm</Link>
                </div>
        </>
    );
}

export default CartSection;
