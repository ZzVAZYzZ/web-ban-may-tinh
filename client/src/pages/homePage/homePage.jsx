import React, { useEffect, useReducer, useState } from "react";
import logo from "../../assets/icons/logo.png";
import carticon from "../../assets/icons/carticon.png";
import filtericon from "../../assets/icons/filtericon.png";
import SearchBar from "../../components/searchBar/searchBar";
import ProductCard from "./components/productCard";
import menuicon from "../../assets/icons/menuicon.png";
import checkicon from "../../assets/icons/checktramsactopmicon.png";
import { fetchProducts } from "../../redux/features/counter/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

const initialState = {
  danhMuc: "",
  noiBan: "",
  thuongHieu: "",
};



const HomePage = () => {
  let productsFromRedux = useSelector((state) => state.products.products);
  const [products,setProducts] = useState([])
  const reduxDispatch = useDispatch();
  const [filterState, dispatch] = useReducer(filterReducer, initialState);
  const [isMoreButtonDisplay, setIsMoreButtonDisplay] = useState(true);

  function filterReducer(state, action) {
    switch (action.type) {
      case "SET_DANHMUC":
        return { ...state, danhMuc: action.payload };
      case "SET_NOIBAN":
        return { ...state, noiBan: action.payload };
      case "SET_THUONGHIEU":
        return { ...state, thuongHieu: action.payload };
      case "RESET_FILTERS":
        setProducts(productsFromRedux);
        return initialState;
      default:
        return state;
    }
  }



  const handleRadioChange = (type, value) => {
    dispatch({ type, payload: value });
  };

  const resetFilter = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  const handleMoreButtonClick = () => {
    if (isMoreButtonDisplay) {
      setIsMoreButtonDisplay(false);
    } else {
      setIsMoreButtonDisplay(true);
    }
  };

  useEffect(() => {
    if (productsFromRedux.length===0) {
      reduxDispatch(fetchProducts());
    }
  }, [reduxDispatch,productsFromRedux]);

  useEffect(() => {
    setProducts(productsFromRedux);
  }, [productsFromRedux]);

  const filterProducts = () => {
    const arr = []
    productsFromRedux.forEach(product => {
      const matchStore = filterState.noiBan ? product.store === filterState.noiBan : true;
      const matchBrand = filterState.thuongHieu ? product.brand === filterState.thuongHieu : true;
      const matchCategory = filterState.danhMuc ? product.catalogue === filterState.danhMuc : true;
  
      if(matchStore && matchBrand && matchCategory){
        arr.push(product)
      };
    });
    
    setProducts(arr);
  }

  useEffect(() => {
    
    filterProducts()
  },[filterState]);

  return (
    <div className=" flex flex-col">
      {/* head */}
      <div className=" w-full h-[90px]  flex flex-row justify-between items-center">
        <Link to="/" className="flex flex-row gap-[24px] ml-[62px] ">
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div className=" text-[#38D7E7] font-bold text-[32px]">PAYPEE</div>
        </Link>
        <SearchBar />
        <Link to="/cart" className=" ml-[32px] mr-[80px]">
          <img src={carticon} alt="cart icon" />
        </Link>
      </div>
      {/* main */}
      <div className=" w-[1312px] h-[592px] mt-[67px]  m-auto flex flex-row justify-between">
        {/* filter */}
        <div className=" w-[272px] h-full  flex flex-col items-center">
          <div className=" w-full h-[50px] bg-[#38D7E7] flex flex-row items-center justify-center gap-[20px]">
            <div>
              <img src={filtericon} alt="filter icon" />
            </div>
            <div className=" text-[16px] text-[#fff]">BỘ LỌC TÌM KIẾM</div>
          </div>
          <div className=" w-[210px] h-[440px]  mt-[16px]">
            <ul className=" w-[174px] flex flex-col m-auto">
              <li>
                <h2 className=" text-[#38D7E7] text-[18px] mb-[5px] ml-[15px]">
                  Theo Danh Mục
                </h2>
                {/* <div className=" flex flex-row items-center gap-[8px]">
                  <input
                    type="radio"
                    name="danh muc"
                    value="Theo tên từ A-Z"
                    checked={filterState.danhMuc === "Theo tên từ A-Z"}
                    onChange={() =>
                      handleRadioChange("SET_DANHMUC", "Theo tên từ A-Z")
                    }
                  />{" "}
                  <p className=" text-[16px] text-[#38D7E7]">Theo tên từ A-Z</p>{" "}
                </div> */}
                <div className=" flex flex-row items-center gap-[8px]">
                  <input
                    type="radio"
                    name="danh muc"
                    value="Bàn Phím Cơ"
                    checked={filterState.danhMuc === "Bàn Phím Cơ"}
                    onChange={() =>
                      handleRadioChange("SET_DANHMUC", "Bàn Phím Cơ")
                    }
                  />{" "}
                  <p className=" text-[16px] text-[#38D7E7]">Bàn Phím Cơ</p>{" "}
                </div>
                <div className=" flex flex-row items-center gap-[8px]">
                  <input
                    type="radio"
                    name="danh muc"
                    value="Bàn Phím Gaming"
                    checked={filterState.danhMuc === "Bàn Phím Gaming"}
                    onChange={() =>
                      handleRadioChange("SET_DANHMUC", "Bàn Phím Gaming")
                    }
                  />{" "}
                  <p className=" text-[16px] text-[#38D7E7]">Bàn Phím Gaming</p>{" "}
                </div>
                <div className=" flex flex-row items-center gap-[8px]">
                  <input
                    type="radio"
                    name="danh muc"
                    value="Bàn Phím Văn Phòng"
                    checked={filterState.danhMuc === "Bàn Phím Văn Phòng"}
                    onChange={() =>
                      handleRadioChange("SET_DANHMUC", "Bàn Phím Văn Phòng")
                    }
                  />{" "}
                  <p className=" text-[16px] text-[#38D7E7]">
                    Bàn Phím Văn Phòng
                  </p>{" "}
                </div>
                <div className=" flex flex-row items-center gap-[8px]">
                  <input
                    type="radio"
                    name="danh muc"
                    value="Bàn Phím Custom"
                    checked={filterState.danhMuc === "Bàn Phím Custom"}
                    onChange={() =>
                      handleRadioChange("SET_DANHMUC", "Bàn Phím Custom")
                    }
                  />{" "}
                  <p className=" text-[16px] text-[#38D7E7]">Bàn Phím Custom</p>{" "}
                </div>
                <div className=" flex flex-row items-center gap-[8px]">
                  <input
                    type="radio"
                    name="danh muc"
                    value="Phụ Kiện Custom"
                    checked={filterState.danhMuc === "Phụ Kiện Custom"}
                    onChange={() =>
                      handleRadioChange("SET_DANHMUC", "Phụ Kiện Custom")
                    }
                  />{" "}
                  <p className=" text-[16px] text-[#38D7E7]">Phụ Kiện Custom</p>{" "}
                </div>
              </li>
              <li>
                <h2 className=" text-[#38D7E7] text-[18px] mb-[5px] ml-[15px]">
                  Nơi Bán
                </h2>
                <div className=" flex flex-row items-center gap-[8px]">
                  <input
                    type="radio"
                    name="noi ban"
                    value="Tp Hồ Chí Minh"
                    checked={filterState.noiBan === "Tp Hồ Chí Minh"}
                    onChange={() =>
                      handleRadioChange("SET_NOIBAN", "Tp Hồ Chí Minh")
                    }
                  />{" "}
                  <p className=" text-[16px] text-[#38D7E7]">Tp Hồ Chí Minh</p>{" "}
                </div>
                <div className=" flex flex-row items-center gap-[8px]">
                  <input
                    type="radio"
                    name="noi ban"
                    value="Hà Nội"
                    checked={filterState.noiBan === "Hà Nội"}
                    onChange={() => handleRadioChange("SET_NOIBAN", "Hà Nội")}
                  />{" "}
                  <p className=" text-[16px] text-[#38D7E7]">Hà Nội</p>{" "}
                </div>
                <div className=" flex flex-row items-center gap-[8px]">
                  <input
                    type="radio"
                    name="noi ban"
                    value="Quốc Tế"
                    checked={filterState.noiBan === "Quốc Tế"}
                    onChange={() => handleRadioChange("SET_NOIBAN", "Quốc Tế")}
                  />{" "}
                  <p className=" text-[16px] text-[#38D7E7]">Quốc Tế</p>{" "}
                </div>
              </li>
              <li>
                <h2 className=" text-[#38D7E7] text-[18px] mb-[5px] ml-[15px]">
                  Thương Hiệu
                </h2>
                <div className=" flex flex-row items-center gap-[8px]">
                  <input
                    type="radio"
                    name="thuong hieu"
                    value="Razer"
                    checked={filterState.thuongHieu === "Razer"}
                    onChange={() =>
                      handleRadioChange("SET_THUONGHIEU", "Razer")
                    }
                  />{" "}
                  <p className=" text-[16px] text-[#38D7E7]">Razer</p>{" "}
                </div>
                <div className=" flex flex-row items-center gap-[8px]">
                  <input
                    type="radio"
                    name="thuong hieu"
                    value="Logitech"
                    checked={filterState.thuongHieu === "Logitech"}
                    onChange={() =>
                      handleRadioChange("SET_THUONGHIEU", "Logitech")
                    }
                  />{" "}
                  <p className=" text-[16px] text-[#38D7E7]">Logitech</p>{" "}
                </div>
                <div className=" flex flex-row items-center gap-[8px]">
                  <input
                    type="radio"
                    name="thuong hieu"
                    value="Corsair"
                    checked={filterState.thuongHieu === "Corsair"}
                    onChange={() =>
                      handleRadioChange("SET_THUONGHIEU", "Corsair")
                    }
                  />{" "}
                  <p className=" text-[16px] text-[#38D7E7]">Corsair</p>{" "}
                </div>
                <div className=" flex flex-row items-center gap-[8px]">
                  <input
                    type="radio"
                    name="thuong hieu"
                    value="Akko"
                    checked={filterState.thuongHieu === "Akko"}
                    onChange={() => handleRadioChange("SET_THUONGHIEU", "Akko")}
                  />{" "}
                  <p className=" text-[16px] text-[#38D7E7]">Akko</p>{" "}
                </div>
                <div className=" flex flex-row items-center gap-[8px]">
                  <input
                    type="radio"
                    name="thuong hieu"
                    value="Asus"
                    checked={filterState.thuongHieu === "Asus"}
                    onChange={() => handleRadioChange("SET_THUONGHIEU", "Asus")}
                  />{" "}
                  <p className=" text-[16px] text-[#38D7E7]">Asus</p>{" "}
                </div>
              </li>
            </ul>
          </div>
          <button
            className=" w-[220px] h-[50px] text-[#fff] text-[16px] bg-[#EE376B] flex items-center justify-center mt-[34px]"
            onClick={resetFilter}
          >
            XÓA BỘ LỌC
          </button>
        </div>
        {/* products list */}
        <div className=" w-[992px] h-full  flex flex-col">
          <div className=" h-[50px] w-full flex flex-row justify-between">
            <div className=" w-[270px] h-[50px] shadow-2xl border-spacing-0 border  bg-[#fff] flex flex-row justify-center items-center gap-[31px]">
              <img
                className=" w-[24px] h-[14px]"
                src={menuicon}
                alt="menu icon"
              />
              <p className=" text-[16px] text-[#38D7E7] font-bold">
                Danh sách sản phẩm
              </p>
            </div>
            <Link
              to="/check-transaction"
              className=" w-[210px] h-[50px] shadow-xl bg-[#38D7E7] flex flex-row justify-center items-center gap-[14px]"
            >
              <img src={checkicon} alt="check icon" />
              <p className=" text-[16px] text-[#fff] font-bold">
                Theo Dõi Đơn Hàng
              </p>
            </Link>
          </div>
          <div
            className={
              isMoreButtonDisplay
                ? " w-[950px] h-full flex flex-col items-center gap-[23px]"
                : " w-[950px] h-full flex flex-col items-center gap-[23px] overflow-y-scroll"
            }
          >
            <div className=" flex flex-row mt-[63px] gap-[3px]">
              {products.length !== 0 ? (
                products.slice(0, 4).map((product, index) => {
                  return (
                    <Link to={`/product-detail/${product.id} `} key={index}>
                      <ProductCard
                        productName={product.productName}
                        productAmount={product.price}
                        rating={product.rating}
                        productImage={product.image}
                      />
                    </Link>
                  );
                })
              ) : (
                <>Loading...</>
              )}
            </div>
            {!isMoreButtonDisplay && (
              <div className="flex flex-row gap-[3px]">
                {products.length !== 0 ? (
                  products.slice(4, 8).map((product, index) => {
                    return (
                      <Link to={`/product-detail/${product.id} `} key={index}>
                        <ProductCard
                          productName={product.productName}
                          productAmount={product.price}
                          rating={product.rating}
                          productImage={product.image}
                        />
                      </Link>
                    );
                  })
                ) : (
                  <>Loading...</>
                )}
              </div>
            )}
            {!isMoreButtonDisplay && (
              <Link to="products">
                <button
                  
                  className=" w-[166px] h-[50px] text-[#38D7E7] shadow-xl border ml-auto mr-auto font-bold p-[10px]"
                >
                  Xem Thêm
                </button>
              </Link>
            )}
          </div>
          {isMoreButtonDisplay && products.length>4 && (
            <button
              className=" w-[166px] h-[50px] text-[#38D7E7] shadow-xl border ml-auto mr-auto font-bold"
              onClick={handleMoreButtonClick}
            >
              Xem Thêm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
