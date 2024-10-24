import React from "react";
import {useDispatch } from "react-redux";
import { increaseProductQuantity, decreaseProductQuantity, removeProduct } from "../../../redux/features/counter/cartSlice";

const ProductCart = (props) => {
    
    const reduxDispatch = useDispatch();

    const handleIncreaseProductQuantity = () => {
        reduxDispatch(increaseProductQuantity(props.product.productId));
    }

    const handleDecreaseProductQuantity = () => {
        reduxDispatch(decreaseProductQuantity(props.product.productId));
    }

    const handleRemoveProduct = () => {
        reduxDispatch(removeProduct(props.product.productId));
    }


  return (
    <div className=" w-[700px] flex flex-row justify-center items-center gap-[25px] mb-[25px]">
      <div className=" w-[180px] h-[120px]">
        <img
          src={props.product.image}
          alt="product-image"
          className=" w-full h-full"
        />
      </div>
      <div className=" h-full flex flex-col gap-[50px]">
        <h1 className=" w-[300px] text-[16px] font-bold">
          {props.product.productName}
        </h1>
        <h2 className=" text-[16px] font-bold">{props.product.price?.toLocaleString()} VND</h2>
      </div>
      <div className=" flex flex-row gap-[16px]">
        {/* mui ten trai */}
        <button onClick={handleDecreaseProductQuantity}>
          <svg
            width="18"
            height="25"
            viewBox="0 0 18 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.514842 13.5281L16.1169 24.7779C16.297 24.9077 16.5077 24.9837 16.7262 24.9977C16.9448 25.0116 17.1628 24.9631 17.3568 24.8573C17.5507 24.7514 17.7132 24.5924 17.8266 24.3973C17.94 24.2022 17.9999 23.9785 18 23.7504V1.25081C18.0001 1.02266 17.9403 0.798818 17.827 0.603546C17.7138 0.408274 17.5513 0.249019 17.3573 0.14304C17.1633 0.0370616 16.9452 -0.0115988 16.7266 0.00233305C16.5079 0.0162649 16.2971 0.0922576 16.1169 0.222075L0.514842 11.4719C0.355891 11.5874 0.226079 11.7412 0.136443 11.9202C0.046808 12.0992 0 12.2981 0 12.5C0 12.7019 0.046808 12.9008 0.136443 13.0798C0.226079 13.2588 0.355891 13.4126 0.514842 13.5281Z"
              fill="#EE376B"
            />
          </svg>
        </button>

        {/* quantity */}
        <div className=" text-[20px]">
            {props.product.quantity}
        </div>
        {/* mui ten phai */}
        <button onClick={handleIncreaseProductQuantity}>
          <svg
            width="18"
            height="25"
            viewBox="0 0 18 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.56982e-06 2.02243V22.9747C3.56982e-06 24.5724 1.54359 25.5432 2.73232 24.6736L17.1746 14.1974C17.4274 14.015 17.6357 13.7627 17.78 13.4639C17.9243 13.1651 18 12.8296 18 12.4885C18 12.1474 17.9243 11.8118 17.78 11.513C17.6357 11.2143 17.4274 10.9619 17.1746 10.7795L2.73232 0.323596C2.46471 0.126297 2.15534 0.0149877 1.83686 0.00141038C1.51838 -0.0121669 1.20258 0.0724908 0.922788 0.246453C0.642996 0.420415 0.409582 0.677232 0.247168 0.989811C0.0847547 1.30239 -0.0006363 1.65914 3.56982e-06 2.02243Z"
              fill="#EE376B"
            />
          </svg>
        </button>
      </div>
      <div>
        <button onClick={handleRemoveProduct}>
          <svg
            width="40"
            height="44"
            viewBox="0 0 40 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.6 8H30.4V5.6C30.4 4.11479 29.81 2.69041 28.7598 1.6402C27.7096 0.589998 26.2852 0 24.8 0H15.2C13.7148 0 12.2904 0.589998 11.2402 1.6402C10.19 2.69041 9.6 4.11479 9.6 5.6V8H2.4C1.76348 8 1.15303 8.25286 0.702944 8.70294C0.252856 9.15303 0 9.76348 0 10.4C0 11.0365 0.252856 11.647 0.702944 12.0971C1.15303 12.5471 1.76348 12.8 2.4 12.8H3.2V40C3.2 41.0609 3.62143 42.0783 4.37157 42.8284C5.12172 43.5786 6.13913 44 7.2 44H32.8C33.8609 44 34.8783 43.5786 35.6284 42.8284C36.3786 42.0783 36.8 41.0609 36.8 40V12.8H37.6C38.2365 12.8 38.847 12.5471 39.2971 12.0971C39.7471 11.647 40 11.0365 40 10.4C40 9.76348 39.7471 9.15303 39.2971 8.70294C38.847 8.25286 38.2365 8 37.6 8ZM14.4 5.6C14.4 5.38783 14.4843 5.18434 14.6343 5.03431C14.7843 4.88429 14.9878 4.8 15.2 4.8H24.8C25.0122 4.8 25.2157 4.88429 25.3657 5.03431C25.5157 5.18434 25.6 5.38783 25.6 5.6V8H14.4V5.6ZM32 39.2H8V12.8H32V39.2ZM17.6 19.2V32C17.6 32.6365 17.3471 33.247 16.8971 33.6971C16.447 34.1471 15.8365 34.4 15.2 34.4C14.5635 34.4 13.953 34.1471 13.5029 33.6971C13.0529 33.247 12.8 32.6365 12.8 32V19.2C12.8 18.5635 13.0529 17.953 13.5029 17.5029C13.953 17.0529 14.5635 16.8 15.2 16.8C15.8365 16.8 16.447 17.0529 16.8971 17.5029C17.3471 17.953 17.6 18.5635 17.6 19.2ZM27.2 19.2V32C27.2 32.6365 26.9471 33.247 26.4971 33.6971C26.047 34.1471 25.4365 34.4 24.8 34.4C24.1635 34.4 23.553 34.1471 23.1029 33.6971C22.6529 33.247 22.4 32.6365 22.4 32V19.2C22.4 18.5635 22.6529 17.953 23.1029 17.5029C23.553 17.0529 24.1635 16.8 24.8 16.8C25.4365 16.8 26.047 17.0529 26.4971 17.5029C26.9471 17.953 27.2 18.5635 27.2 19.2Z"
              fill="#EE376B"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
