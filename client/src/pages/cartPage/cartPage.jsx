import React from 'react';
import {Outlet} from 'react-router-dom';

import Cart from './components/cart';

const CartPage = () => {
    
    return (
        <div className=' w-full flex justify-center items-center'>
            <div className=' w-[900px]  border shadow-xl mt-[50px] flex flex-col'>
                <Cart />
                <Outlet />
            </div>
        </div>
        
    );
}

export default CartPage;
