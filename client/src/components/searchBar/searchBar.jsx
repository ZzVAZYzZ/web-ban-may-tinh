import React, { useEffect, useState, useCallback } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const products = useSelector((state) => state.products.products);
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const [isFocus,setIsFocus] = useState(false);

  const [isMouseOver,setIsMouseOver] = useState(false);

  useEffect(()=>{
    console.log(isMouseOver);
    
  },[isMouseOver])

  const removeVietnameseTones = (str) => {
    return str
      .normalize('NFD') 
      .replace(/[\u0300-\u036f]/g, '') 
      .replace(/đ/g, 'd') 
      .replace(/Đ/g, 'D') 
      .replace(/[^a-zA-Z0-9 ]/g, ''); 
  };

  const searchDebounce = useCallback(
    _.debounce((value) => {
      const searchArray = [];
      _.each(products, (item) => {
        if (
          removeVietnameseTones(_.lowerCase(item.productName)).includes(removeVietnameseTones(_.lowerCase(value))) &&
          value !== ""
        ) {
          searchArray.push(item);
        }
      });
      setSearchResult(searchArray);
    }, 300),
    [products]
  );

  useEffect(() => {
    searchDebounce(searchValue);
  }, [searchDebounce, searchValue]);

  return (
    <div className=" flex flex-row w-[950px] h-[55px] border shadow-xl items-center justify-between relative">
      <div className=" w-full h-[30px] absolute flex flex-row justify-between items-center">
        <input
          type="text"
          className=" outline-none w-[700px] h-[30px]  ml-[30px] text-[25px] align-middle leading-[30px]"
          placeholder="Mời bạn nhập sản phẩm cần tìm!"
          onChange={(e) => handleSearchChange(e)}
          onBlur={()=>{
            if(!isMouseOver){
              // console.log(isFocus)
              setIsFocus(false);
            }
            
          }}
          onFocus={()=>{
            setIsFocus(true)
          }}
          value={searchValue}
        />

        <button className=" bg-[#38D7E7] flex items-center justify-center w-[120px] h-[40px] mr-[7px] ">
          <svg
            className="w-[30px] h-[30px]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
        {searchResult.length !== 0 && isFocus &&(
          <div className=" bg-white absolute w-[823px] top-[42px] border-[1px] border-[#333] flex flex-col items-between"
            onMouseOver={()=>{
              setIsMouseOver(true)
            }}
            onMouseOut={()=>{
              setIsMouseOver(false)
            }}

          >
            {_.map(searchResult.slice(0, 3), (item, key) => {
              return (
                <Link
                  to={`/product-detail/${item.id}`}
                  key={key}
                  className=" w-full h-[90px] p-[10px] flex flex-row gap-5"
                  onClick={()=>{
                    setSearchValue("");
                  }}
                >
                  <div className=" w-[90px] h-full shadow">
                    <img
                      src={item.image}
                      alt="hinh san pham"
                      className=" w-full h-full "
                    />
                  </div>
                  <div className=" w-[auto] h-full flex flex-col">
                    <div className=" text-[14px]">{item.productName}</div>
                    <div className=" text-[14px]">
                      {item.price.toLocaleString()} VND
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
