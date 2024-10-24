import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { queryProductById } from "../../redux/features/counter/productsSlice";
import { addProductToCart } from "../../redux/features/counter/cartSlice";
import SearchBar from "../../components/searchBar/searchBar";
import carticon from '../../assets/icons/carticon.png'
import logo from '../../assets/icons/logo.png'
import star from '../../assets/icons/star.png'
import _ from 'lodash'
import { fetchProducts } from "../../redux/features/counter/productsSlice";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.products.productDetail);
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const cart = useSelector((state) => state.cart.cart);
    const handleAddProductToCart = () => {
        const cloneProduct = {
            productId,
            quantity: 1,
            ...product
        }
        reduxDispatch(addProductToCart(cloneProduct));
        
    }

    useEffect(()=>{
        console.log(cart);
        
    },[cart])

  useEffect(() => {
    if (products.length===0) {
      reduxDispatch(fetchProducts());
    }
  }, [reduxDispatch,products]);



  useEffect(() => {
    reduxDispatch(queryProductById(productId));
  }, [reduxDispatch, productId]);

  useEffect(() => {
    if (product === undefined) {
      navigate("/404");
    }
  }, [product, navigate]);

  useEffect(()=>{
    console.log(products);
  },[products])

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
      <div className=" mt-[50px] flex justify-center">
            {product!==undefined && status!=="loading" ?(
                <div className=" w-[1300px]">
                    <div className="text-[20px]"><span className="text-[#38D7E7] text-[20px]"><Link to="/">Trang chủ</Link> / Bàn phím / </span>{product.productName}</div>
                    <div className=" w-full flex flex-row mt-[20px] border shadow-xl">
                        <div className=" w-[400px] h-[400px]">
                            <img className="w-full h-full" src={product.image} alt="product-image" />
                        </div>
                        <div className=" w-[800px] h-[400px] ml-[80px] flex flex-col gap-[15px]">
                            <div>
                                <h2 className=" text-[26px] mt-[20px]">{product.productName}</h2>
                            </div>
                            <div className=" flex flex-row items-center gap-[5px]">
                                <div className="text-[18px] text-[#FFCE31] font-bold">{product.rating} </div>
                                <div className="w-[18px] h-[18px]"><img src={star} alt="star" className="w-full h-full"/></div>
                            </div>
                            <div>
                                <div className=" text-[18px] font-bold">
                                    {product.price?.toLocaleString()} VND
                                </div>
                            </div>
                            <div className=" flex flex-row gap-[30px]">
                                <button className="w-[300px] h-[70px] border border-[#38D7E7]">
                                    <div></div>
                                    <div className=" text-[#38D7E7] text-[24px]" onClick={handleAddProductToCart}>Thêm vào giỏ hàng</div> 
                                </button>
                                <Link to="/cart" className="w-[300px] h-[70px] border bg-[#EE376B] flex justify-center items-center" onClick={handleAddProductToCart}>
                                    <div className=" text-[#fff] text-[24px]">MUA NGAY</div> 
                                </Link>
                            </div>
                            <div>
                                <h1 className=" text-[20px] font-bold">Thông tin chung: </h1>
                                <div>
                                    <b>Nhà sản xuất:</b> {product.brand}
                                    <br /><b>Tình trạng:</b> {product.status}
                                    <br /><b>Bảo hành:</b> {product.warranty}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" mt-[20px] border shadow-xl flex flex-row">
                        <div className="w-[700px]">
                            <h1 className="text-[21px] ml-[25px]">Thông tin sản phẩm</h1>
                            <h1 className="text-[21px] ml-[25px]">Thông số kỹ thuật:</h1>
                            <div className=" w-[650px] ml-[30px] mb-[30px] mt-[30px]">
                                <div className="  flex flex-row ">
                                    <div className="  w-[275px] bg-[#DBFCFF] border border-[#fff] flex items-center">
                                        <h2 className=" text-[14px] font-bold ml-[10px]">Hãng sản xuất: </h2>
                                    </div>
                                    <div className=" w-[375px] border border-[#DBFCFF] ">
                                        <div className="ml-[30px]">
                                            {product.brand} / ID sản phẩm: {productId}
                                        </div>
                                    </div>
                                </div>
                                <div className="  flex flex-row">
                                    <div className="  w-[275px] bg-[#DBFCFF] border border-[#fff]">
                                        <h2 className=" text-[14px] font-bold ml-[10px]">Model: </h2>
                                    </div>
                                    <div className="  w-[375px] border border-[#DBFCFF]">
                                        <div className="ml-[30px]">
                                            {product.specifications?.model}
                                        </div>
                                    </div>
                                </div>
                                <div className="  flex flex-row">
                                    <div className="  w-[275px] bg-[#DBFCFF] border border-[#fff]">
                                        <h2 className=" text-[14px] font-bold ml-[10px]">Switch: </h2>
                                    </div>
                                    <div className="  w-[375px] border border-[#DBFCFF]">
                                        <div className="ml-[30px]">
                                            {product.specifications?.switch}
                                        </div>
                                    </div>
                                </div>
                                <div className="  flex flex-row">
                                    <div className="  w-[275px] bg-[#DBFCFF] border border-[#fff]">
                                        <h2 className=" text-[14px] font-bold ml-[10px]">Keycaps: </h2>
                                    </div>
                                    <div className="  w-[375px] border border-[#DBFCFF]">
                                        <div className="ml-[30px]">
                                        
                                            {product.specifications?.keycaps}
                                        </div>
                                    </div>
                                </div>
                                <div className="  flex flex-row">
                                    <div className="  w-[275px] bg-[#DBFCFF] border border-[#fff]">
                                        <h2 className=" text-[14px] font-bold ml-[10px]">Kích thước:  </h2>
                                    </div>
                                    <div className="  w-[375px] border border-[#DBFCFF]">
                                        <div className="ml-[30px]">
                                            {product.specifications?.size}
                                        </div>
                                    </div>
                                </div>
                                <div className="  flex flex-row">
                                    <div className="  w-[275px] bg-[#DBFCFF] border border-[#fff]">
                                        <h2 className=" text-[14px] font-bold ml-[10px]">LED: </h2>
                                    </div>
                                    <div className="  w-[375px] border border-[#DBFCFF]">
                                        <div className="ml-[30px]">
                                            {product.specifications?.led}
                                        </div>
                                    </div>
                                </div>
                                <div className="  flex flex-row">
                                    <div className="  w-[275px] bg-[#DBFCFF] border border-[#fff]">
                                        <h2 className=" text-[14px] font-bold ml-[10px]">Bộ nhớ tích hợp: </h2>
                                    </div>
                                    <div className="  w-[375px] border border-[#DBFCFF]">
                                        <div className="ml-[30px]">
                                            {product.specifications?.memory}
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex flex-row">
                                    <div className="  w-[275px] bg-[#DBFCFF] border border-[#fff]">
                                        <h2 className=" text-[14px] font-bold ml-[10px]">Kết nối:  </h2>
                                    </div>
                                    <div className="  w-[375px] border border-[#DBFCFF]">
                                        <div className="ml-[30px]">
                                            {product.specifications?.connection}
                                        </div>
                                    </div>
                                </div>
                                <div className="  flex flex-row">
                                    <div className="  w-[275px] bg-[#DBFCFF] border border-[#fff]">
                                        <h2 className=" text-[14px] font-bold ml-[10px]">Hotswap </h2>
                                    </div>
                                    <div className=" w-[375px] border border-[#DBFCFF]">
                                        <div className="ml-[30px]">
                                            {product.specifications?.hotswap}
                                        </div>
                                    </div>
                                </div>
                                <div className="  flex flex-row">
                                    <div className="  w-[275px] bg-[#DBFCFF] border border-[#fff]">
                                        <h2 className=" text-[14px] font-bold ml-[10px]">Tính năng hỗ trợ: </h2>
                                    </div>
                                    <div className="  w-[375px] border border-[#DBFCFF]">
                                        <div className="ml-[30px]">
                                            {product.specifications?.supportFeature}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[600px] ml-[70px] flex flex-col">
                            <h1 className="text-[21px] mt-[25px]">Giới thiệu về PAYPEE</h1>
                            <div className=" mt-[25px] w-[500px]">
                                <p className=" text-[24px]">Hotline : 0909 888 999</p>
                                <p className=" text-[24px]">Góp ý và khiếu nại : paypee3939@gmail.com</p>
                                <p className=" text-[24px]">Chính sách bảo hành</p>
                                <p className=" text-[24px]">Chính sách thanh toán</p>
                                <p className=" text-[24px]">Chính sách bảo mật</p>
                            </div>
                        </div>
                    </div>
                </div>
            ):
            <div>
                Loading...
            </div>
            }
        </div>
    </div>
  );
};

export default ProductDetailPage;
