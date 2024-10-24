import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from "lodash";

const TransactionProductCard = (prop) => {
    const products = useSelector((state)=>state.products.products);
    const [productIamge,setProductImage] = useState("");
    useEffect(()=>{
        console.log(products);
        
        _.each(products, (product)=>{
            if(product.id===prop.productId){
                setProductImage(product.image);
            }
        })
    },[])
    return (
        <div className=" w-full h-[100px]  mb-[10px] flex flex-row">
            <div className=' w-[150px] h-full'>
                <img src={productIamge} alt="product-image" className='w-full h-full'/>
            </div>
            <div className='ml-[50px] w-[340px] h-full flex flex-col justify-between'>
                <div className=' text-[#fff] text-[14px] font-bold'>{prop.productName}</div>
                <div className='   flex flex-row justify-between'>
                    <div className='text-[#fff] text-[14px] font-bold'>x{prop.quantity}</div>
                    <div className='text-[#fff] text-[14px] font-bold'>{prop.productPrice.toLocaleString()} VND</div>
                </div>
            </div>
        </div>
    );
}

export default TransactionProductCard;
