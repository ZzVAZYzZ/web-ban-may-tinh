import React, { useState } from "react";
import homeIcon from "../../../assets/icons/homeicon.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserAccount } from "../../../redux/features/counter/userSlice";
import Cookies from "js-cookie";

const Header = () => {
  const userAccount = useSelector((state) => state.user.userAccount);
  const reduxDispatch = useDispatch();
  const handleLogout = async () => {
    const accessToken = localStorage.getItem("PAYPEE_ACCESSTOKEN");
    const payloadOption = {
      email: userAccount.email,
      token: accessToken,
    };
    try {
      await axios.post(
        "https://localhost:8000/api/users/logout",
        payloadOption,
        { withCredentials: true }
      );
      localStorage.removeItem("PAYPEE_ACCESSTOKEN");
      Cookies.remove("refreshToken");
      reduxDispatch(
        setUserAccount({
          email: "",
          id: "",
          role: "",
          username: "",
          vip: 0,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className=" w-full h-[100px] bg-[#38D7E7] flex flex-row justify-between">
      <ul className=" w-[293px] flex flex-row h-full items-center gap-[10px] justify-center">
        <li className=" text-white cursor-pointer">CÁ NHÂN</li>
        <li className=" text-white cursor-pointer">DOANH NGHIỆP</li>
        <li className=" text-white cursor-pointer">TRỢ GIÚP</li>
      </ul>
      <div className="flex flex-row items-center gap-[50px] ">
        {userAccount.role === "" ? (
          <Link to="/login">
            <button className="w-[150px] h-[50px] bg-white rounded-[8px] border border-[#2C698D] text-[#2C698D] text-[24px]">
              Login
            </button>
          </Link>
        ) : userAccount.role === "admin" ? (
          <>
            <Link
              to="/admin"
              className=" text-[32px] text-[#2C698D] bg-white p-[10px]  hover:text-[#30494b] hover:bg-[#e7e6e6]"
            >
              ADMIN
            </Link>
            <button
              onClick={handleLogout}
              className="p-[10px] bg-white text-[18px] hover:text-[#30494b] hover:bg-[#e7e6e6]"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <div className=" text-[24px] h-full text-[#fff]  hover:text-[#30494b] flex flex-row items-center gap-[10px] relative group ">
              <div className=" w-[50px] h-[50px] bg-[#ec8d8d] rounded-[100%] hover:bg-[#a94e4e] cursor-pointer"></div>
              <div className="cursor-pointer">{userAccount.username}</div>
              <div className=" w-[350px] h-[320px] bg-[#DBFCFF] absolute top-[100px] left-[-175px] z-40 hidden group-hover:flex items-center flex-col">
                <div className=" w-full h-[100px] bg-[#D9D9D9] absolute"></div>
                <Link
                  to={`user/${userAccount.id}`}
                  className=" w-[100px] h-[100px] bg-[#fff] rounded-full absolute top-[50px] left-[125px] flex justify-center items-center cursor-pointer"
                >
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25 0C28.3152 0 31.4946 1.31696 33.8388 3.66116C36.183 6.00537 37.5 9.18479 37.5 12.5C37.5 15.8152 36.183 18.9946 33.8388 21.3388C31.4946 23.683 28.3152 25 25 25C21.6848 25 18.5054 23.683 16.1612 21.3388C13.817 18.9946 12.5 15.8152 12.5 12.5C12.5 9.18479 13.817 6.00537 16.1612 3.66116C18.5054 1.31696 21.6848 0 25 0ZM25 31.25C38.8125 31.25 50 36.8438 50 43.75V50H0V43.75C0 36.8438 11.1875 31.25 25 31.25Z"
                      fill="#2C698D"
                    />
                  </svg>
                </Link>
                <div className="w-full text-center mt-[150px] text-[20px] text-[#2C698D] font-bold">
                  <div className=" cursor-pointer">{userAccount.username}</div>
                </div>
                <Link to={`user/${userAccount.id}`}>
                  <div className=" w-[250px] flex flex-row  gap-2 cursor-pointer mt-[5px] hover:bg-[#8bc3e4]">
                    <div>
                      <svg
                        width="27"
                        height="27"
                        viewBox="0 0 27 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 26H26"
                          stroke="#2C698D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.55566 20.4444V14.8889L20.4446 1L26.0001 6.55556L12.1112 20.4444H6.55566Z"
                          stroke="#2C698D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.2783 5.16699L21.8339 10.7225"
                          stroke="#2C698D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className=" text-[#2C698D] text-[20px]">
                      Chỉnh sửa thông tin
                    </div>
                  </div>
                </Link>

                <Link to={`user/${userAccount.id}`}>
                  <div className=" w-[250px] flex flex-row  gap-2 cursor-pointer mt-[5px] hover:bg-[#8bc3e4]">
                    <div>
                      <svg
                        width="27"
                        height="22"
                        viewBox="0 0 27 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.6346 1H4.36538C2.50673 1 1 2.567 1 4.5V17.5C1 19.433 2.50673 21 4.36538 21H22.6346C24.4933 21 26 19.433 26 17.5V4.5C26 2.567 24.4933 1 22.6346 1Z"
                          stroke="#2C698D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1 7H26M5.80769 10.375H8.69231V11H5.80769V10.375Z"
                          stroke="#2C698D"
                          strokeWidth="3"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className=" text-[#2C698D] text-[20px]">Thêm thẻ</div>
                  </div>
                </Link>

                <div className=" w-[250px] flex flex-row  gap-2 cursor-pointer mt-[5px] hover:bg-[#8bc3e4]" onClick={handleLogout}>
                  <div>
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 12.5C0 12.8315 0.16462 13.1495 0.457646 13.3839C0.750672 13.6183 1.1481 13.75 1.5625 13.75H13.4219L9.82812 16.6125C9.68167 16.7287 9.56543 16.867 9.48611 17.0193C9.40678 17.1716 9.36594 17.335 9.36594 17.5C9.36594 17.665 9.40678 17.8284 9.48611 17.9807C9.56543 18.133 9.68167 18.2713 9.82812 18.3875C9.97338 18.5047 10.1462 18.5977 10.3366 18.6611C10.527 18.7246 10.7312 18.7572 10.9375 18.7572C11.1438 18.7572 11.348 18.7246 11.5384 18.6611C11.7288 18.5977 11.9016 18.5047 12.0469 18.3875L18.2969 13.3875C18.4391 13.2686 18.5506 13.1284 18.625 12.975C18.7813 12.6707 18.7813 12.3293 18.625 12.025C18.5506 11.8716 18.4391 11.7314 18.2969 11.6125L12.0469 6.6125C11.9012 6.49595 11.7282 6.4035 11.5379 6.34043C11.3475 6.27735 11.1435 6.24489 10.9375 6.24489C10.7315 6.24489 10.5275 6.27735 10.3371 6.34043C10.1468 6.4035 9.97381 6.49595 9.82812 6.6125C9.68244 6.72905 9.56688 6.86741 9.48803 7.01969C9.40919 7.17197 9.36861 7.33518 9.36861 7.5C9.36861 7.66482 9.40919 7.82803 9.48803 7.98031C9.56688 8.13259 9.68244 8.27095 9.82812 8.3875L13.4219 11.25H1.5625C1.1481 11.25 0.750672 11.3817 0.457646 11.6161C0.16462 11.8505 0 12.1685 0 12.5ZM20.3125 0H4.6875C3.4443 0 2.25201 0.395088 1.37294 1.09835C0.49386 1.80161 0 2.75544 0 3.75V7.5C0 7.83152 0.16462 8.14946 0.457646 8.38388C0.750672 8.6183 1.1481 8.75 1.5625 8.75C1.9769 8.75 2.37433 8.6183 2.66735 8.38388C2.96038 8.14946 3.125 7.83152 3.125 7.5V3.75C3.125 3.41848 3.28962 3.10054 3.58265 2.86612C3.87567 2.6317 4.2731 2.5 4.6875 2.5H20.3125C20.7269 2.5 21.1243 2.6317 21.4174 2.86612C21.7104 3.10054 21.875 3.41848 21.875 3.75V21.25C21.875 21.5815 21.7104 21.8995 21.4174 22.1339C21.1243 22.3683 20.7269 22.5 20.3125 22.5H4.6875C4.2731 22.5 3.87567 22.3683 3.58265 22.1339C3.28962 21.8995 3.125 21.5815 3.125 21.25V17.5C3.125 17.1685 2.96038 16.8505 2.66735 16.6161C2.37433 16.3817 1.9769 16.25 1.5625 16.25C1.1481 16.25 0.750672 16.3817 0.457646 16.6161C0.16462 16.8505 0 17.1685 0 17.5V21.25C0 22.2446 0.49386 23.1984 1.37294 23.9017C2.25201 24.6049 3.4443 25 4.6875 25H20.3125C21.5557 25 22.748 24.6049 23.6271 23.9017C24.5061 23.1984 25 22.2446 25 21.25V3.75C25 2.75544 24.5061 1.80161 23.6271 1.09835C22.748 0.395088 21.5557 0 20.3125 0Z"
                        fill="#2C698D"
                      />
                    </svg>
                  </div>
                  <div className=" text-[#2C698D] text-[20px]">Đăng xuất</div>
                </div>
              </div>
            </div>
          </>
        )}

        <Link
          to="/"
          className=" h-full flex items-center justify-center mr-[68px] cursor-pointer"
        >
          <img src={homeIcon} alt="home icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
