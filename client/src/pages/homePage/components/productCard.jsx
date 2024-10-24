import React from 'react';
import star from '../../../assets/icons/star.png'

const ProductCard = (props) => {
    return (
        <div className=' w-[230px] h-[360px] border shadow-xl flex flex-col cursor-pointer'>
            <div className=' w-full h-[230px]'>
                <img src={props.productImage} alt="" className=' w-full h-full'/>
            </div>
            <div className=' w-full h-[130px] flex flex-col gap-[9px] '>
                <p className=' h-[60px] text-[14px]  mr-[10px] ml-[10px] font-medium'>{props.productName}</p>
                <span className='h-[19px] text-[18px] font-bold ml-[10px]'>{props.productAmount.toLocaleString()} VND</span>
                <div className='h-[20px] ml-[10px] flex flex-row items-center gap-[5px]'><img src={star} alt="star icon" className='w-[16px] h-[16px]'/> <span className=' text-[16px] text-[#F01616]'>{props.rating}</span> </div>
            </div>
        </div>
    );
}

export default ProductCard;
