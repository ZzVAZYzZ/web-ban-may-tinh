import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { current } from "../../App";
import { setUserAccount } from "../../redux/features/counter/userSlice";

const UserPage = () => {
  const { userId } = useParams();
  const [activeButton, setActiveButton] = useState("thong tin ca nhan");
  const [activePopup, setActivePopup] = useState(false);
  const [userDetailData, setUserDetailData] = useState({});
  const [editData, setEditData] = useState({
    fullname: "",
    phoneNumber: "",
    idCard: "",
    address: "",
  });
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const getCurrentData = () => {
    current()
      .then((res) => {
        reduxDispatch(setUserAccount(res));
      })
      .then(() => {
        axios
          .get("https://localhost:8000/api/users/auth/getUserDetail", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "PAYPEE_ACCESSTOKEN"
              )}`,
            },
          })
          .then((res) => {
            setUserDetailData(res.data.userDetail);
            return res;
          })
          .then((res)=>{
            setEditData({
                fullname: res.fullName,
                phoneNumber: res.phoneNumber,
                idCard: res.idCard,
                address: res.address,
            })
          })
          .catch(() => {
            navigate("/not-found");
          });
      });
  };

  useEffect(() => {
    getCurrentData();
  }, []);

  const handleThongTinButtonClick = () => {
    setActiveButton("thong tin ca nhan");
    console.log(userDetailData);
  };

  const handleXemDonHangButtonClick = () => {
    setActiveButton("don hang da mua");
  };

  const handleEditUserData = () => {
    if (activePopup) {
      setActivePopup(false);
    } else {
      setActivePopup(true);
    }
  };

  const handleEditFullNameChange = (e) => {
    setEditData((prevData) => ({
      ...prevData,
      fullname: e.target.value,
    }));
  };

  const handleEditPhoneChange = (e) => {
    setEditData((prevData) => ({
      ...prevData,
      phoneNumber: e.target.value,
    }));
  };

  const handleEditIdCardChange = (e) => {
    setEditData((prevData) => ({
      ...prevData,
      idCard: e.target.value,
    }));
  };

  const handleEditAddressChange = (e) => {
    setEditData((prevData) => ({
      ...prevData,
      address: e.target.value,
    }));
  };

  const handleEditUserDataClick = () => {
    const payloadOption = {
      fullName: editData.fullname,
      phoneNumber: editData.phoneNumber,
      idCard: editData.idCard,
      address: editData.address,
    };
    axios
      .put(
        "https://localhost:8000/api/users/auth/updateUserDetail",
        payloadOption,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "PAYPEE_ACCESSTOKEN"
            )}`,
          },
        }
      )
      .catch(() => {
        alert("Không Cập Nhật Được");
      });

    setActivePopup(false);
    getCurrentData();
  };

  return (
    <div className="w-full h-[900px] bg-[#c6e8e1] flex flex-row">
      <div className=" w-[350px] h-auto bg-white flex flex-col justify-center items-center gap-[10px]  ">
        <button
          onClick={handleThongTinButtonClick}
          className={
            activeButton === "thong tin ca nhan"
              ? "w-[280px] h-[50px] text-[16px] bg-[#F0F0F0] flex justify-center items-center gap-2"
              : "w-[280px] h-[50px] text-[16px] hover:bg-[#F0F0F0] flex justify-center items-center gap-2"
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0C11.3261 0 12.5979 0.526784 13.5355 1.46447C14.4732 2.40215 15 3.67392 15 5C15 6.32608 14.4732 7.59785 13.5355 8.53553C12.5979 9.47322 11.3261 10 10 10C8.67392 10 7.40215 9.47322 6.46447 8.53553C5.52678 7.59785 5 6.32608 5 5C5 3.67392 5.52678 2.40215 6.46447 1.46447C7.40215 0.526784 8.67392 0 10 0ZM10 12.5C15.525 12.5 20 14.7375 20 17.5V20H0V17.5C0 14.7375 4.475 12.5 10 12.5Z"
              fill="black"
            />
          </svg>
          Thông tin cá nhân
        </button>
        <button
          onClick={handleXemDonHangButtonClick}
          className={
            activeButton === "don hang da mua"
              ? "w-[280px] h-[50px] text-[16px] bg-[#F0F0F0] flex justify-center items-center gap-2"
              : "w-[280px] h-[50px] text-[16px] hover:bg-[#F0F0F0] flex justify-center items-center gap-2"
          }
        >
          <svg
            width="20"
            height="15"
            viewBox="0 0 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 10C11.1046 10 12 8.88071 12 7.5C12 6.11929 11.1046 5 10 5C8.89543 5 8 6.11929 8 7.5C8 8.88071 8.89543 10 10 10Z"
              fill="black"
            />
            <path
              d="M19.9603 7.26818C19.1762 5.19385 17.8149 3.39997 16.0447 2.10824C14.2745 0.816515 12.1731 0.0835725 10 0C7.82695 0.0835725 5.72547 0.816515 3.9553 2.10824C2.18512 3.39997 0.823847 5.19385 0.0397175 7.26818C-0.0132392 7.41798 -0.0132392 7.58202 0.0397175 7.73182C0.823847 9.80615 2.18512 11.6 3.9553 12.8918C5.72547 14.1835 7.82695 14.9164 10 15C12.1731 14.9164 14.2745 14.1835 16.0447 12.8918C17.8149 11.6 19.1762 9.80615 19.9603 7.73182C20.0132 7.58202 20.0132 7.41798 19.9603 7.26818ZM10 11.9318C9.14292 11.9318 8.30509 11.6719 7.59246 11.1849C6.87983 10.6979 6.3244 10.0058 5.99641 9.19598C5.66842 8.38617 5.5826 7.49508 5.74981 6.6354C5.91702 5.77571 6.32974 4.98603 6.93578 4.36623C7.54183 3.74643 8.31398 3.32434 9.15458 3.15334C9.99519 2.98234 10.8665 3.0701 11.6583 3.40553C12.4502 3.74097 13.127 4.30901 13.6031 5.03781C14.0793 5.76662 14.3335 6.62347 14.3335 7.5C14.3317 8.67484 13.8746 9.80104 13.0623 10.6318C12.25 11.4625 11.1488 11.93 10 11.9318Z"
              fill="black"
            />
          </svg>
          Đơn hàng đã mua
        </button>
      </div>
      <div className="w-full h-auto flex justify-center items-center flex-col">
        {activeButton === "thong tin ca nhan" ? (
          <>
            <div className=" w-[1000px] h-[500px] relative flex flex-col justify-between bg-white p-[50px]">
              {activePopup ? (
                <div className="w-full h-full absolute bg-white flex flex-col">
                  <div className="w-full flex justify-end pr-5">
                    <button
                      onClick={handleEditUserData}
                      className="p-[10px] border border-[#333] w-[50px] h-[50px] bg-red-500 text-white text-[32px] flex justify-center items-center mt-[20px] hover:bg-red-400"
                    >
                      X
                    </button>
                  </div>
                  <div className="w-full flex flex-col justify-center items-center gap-4">
                    <div className="w-[800px] h-[50px] flex justify-center items-center text-[32px] flex-row gap-[20px] ">
                      <div className="w-[200px]">Họ và Tên:</div>
                      <input
                        onChange={(e) => {
                          handleEditFullNameChange(e);
                        }}
                        className="px-[12px] border border-[#333]"
                        type="text"
                      />
                    </div>
                    <div className="w-[800px] h-[50px] flex justify-center items-center text-[32px] flex-row gap-[20px] ">
                      <div className="w-[200px]">Điện Thoại:</div>
                      <input
                        onChange={(e) => {
                          handleEditPhoneChange(e);
                        }}
                        className="px-[12px] border border-[#333]"
                        type="text"
                      />
                    </div>
                    <div className="w-[800px] h-[50px] flex justify-center items-center text-[32px] flex-row gap-[20px] ">
                      <div className="w-[200px]">Căn Cước:</div>
                      <input
                        onChange={(e) => {
                          handleEditIdCardChange(e);
                        }}
                        className="px-[12px] border border-[#333]"
                        type="text"
                      />
                    </div>
                    <div className="w-[800px] h-[50px] flex justify-center items-center text-[32px] flex-row gap-[20px] ">
                      <div className="w-[200px]">Địa Chỉ:</div>
                      <input
                        onChange={(e) => {
                          handleEditAddressChange(e);
                        }}
                        className="px-[12px] border border-[#333]"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-end pr-5">
                    <button
                      onClick={handleEditUserDataClick}
                      className="w-[150px] h-[50px] border border-[#333] mt-[100px] text-[32px] bg-[pink] text-white hover:bg-pink-200"
                    >
                      LƯU
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="flex flex-row gap-[50px]">
                <div className="text-[32px] w-[400px]">
                  Email:{" "}
                  {userDetailData?.email !== ""
                    ? userDetailData?.email
                    : "Chưa Thêm"}
                </div>
                <div className="text-[32px] w-[400px]">
                  Họ và Tên:{" "}
                  {userDetailData?.fullName !== ""
                    ? userDetailData?.fullName
                    : "Chưa Thêm"}
                </div>
              </div>
              <div className="flex flex-row gap-[50px]">
                <div className="text-[32px] w-[400px]">
                  Căn Cước:{" "}
                  {userDetailData?.idCard !== ""
                    ? userDetailData?.idCard
                    : "Chưa Thêm"}
                </div>
                <div className="text-[32px] w-[400px]">
                  Điện Thoại:{" "}
                  {userDetailData?.phoneNumber !== ""
                    ? userDetailData?.phoneNumber
                    : "Chưa Thêm"}
                </div>
              </div>
              <div className="flex flex-row">
                <div className="text-[32px]">
                  Địa Chỉ:{" "}
                  {userDetailData?.address !== ""
                    ? userDetailData?.address
                    : "Chưa Thêm"}
                </div>
              </div>
              <div className="w-[900px] flex flex-row justify-end">
                <button
                  onClick={handleEditUserData}
                  className="text-[32px] border border-[#333] p-[10px] hover:bg-[#333] hover:text-[#fff]"
                >
                  Chỉnh Sửa Thông Tin
                </button>
              </div>
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
