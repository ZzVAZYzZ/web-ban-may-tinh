import React from 'react';
import notFoundImage from '../../assets/images/not-found-image.png';
import { Link } from 'react-router-dom';

const NoPage = () => {
    return (
        <div className=' w-full  flex justify-center items-center'>
            <div className=' w-[700px] h-[500px]  mt-[150px] flex flex-col items-center justify-between'>
                <div className=' w-[500px] h-[400px]'><img src={notFoundImage} alt="not-found-image" className=' w-full h-full'/></div>
                <div className=' w-full h-[80px] flex justify-center'>
                    <Link to="/">
                        <button className='w-[410px] h-[80px] bg-[#EE376B] text-[#fff] text-[32px] font-bold'>Trở về trang chủ</button>
                    </Link>
                </div>
            </div>
        </div>
        
    );
}

export default NoPage;
