import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getValue } from '../../redux/features/counter/counterSlice';

const HomePage = () => {
    const value = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    dispatch(getValue());
    
    return (
        <div>
            {/* head */}
            <div>
                
            </div>
            {/* main */}
            <div>
                {/* filter */}

                {/* products list */}

            </div>

        </div>
    );
}

export default HomePage;
