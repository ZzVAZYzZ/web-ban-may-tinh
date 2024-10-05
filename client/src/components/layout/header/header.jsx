import React from 'react';
import homeIcon from '../../../assets/icons/homeicon.png'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className=' w-full h-[100px] bg-[#38D7E7] flex flex-row justify-between'>
            <ul className=' w-[293px] flex flex-row h-full items-center gap-[10px] justify-center'>
                <li className=' text-white cursor-pointer'>CÁ NHÂN</li>
                <li className=' text-white cursor-pointer'>DOANH NGHIỆP</li>
                <li className=' text-white cursor-pointer'>TRỢ GIÚP</li>
            </ul>
            <Link to="/" className=' h-full flex items-center justify-center mr-[68px] cursor-pointer'>
                <img src={homeIcon} alt="home icon" />
            </Link>
        </nav>
    );
}

export default Header;
