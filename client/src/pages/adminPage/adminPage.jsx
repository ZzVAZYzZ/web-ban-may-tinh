import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { current } from "../../App";
import { setUserAccount } from "../../redux/features/counter/userSlice";

const AdminPage = () => {
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const handleInputChange = (e) => {
    setTransactionId(e.target.value);
  };
  const getCurrentData = () => {
    current()
      .then((res) => {
        reduxDispatch(setUserAccount(res));
      })
      .then(() => {
        axios
          .get("https://localhost:8000/api/admin/auth", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "PAYPEE_ACCESSTOKEN"
              )}`,
            },
          })
          .catch(() => {
            navigate("/not-found");
          });
      });
  };

  const deleteTransaction = () => {
    axios
      .delete(`https://localhost:8000/api/admin/auth/deleteTransaction`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("PAYPEE_ACCESSTOKEN")}`,
        },
        params: { id: transactionId },
      })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        alert(res.message);
      })
      .catch(() => {
        current().then(() => {
          axios
            .delete(`https://localhost:8000/api/admin/auth/deleteTransaction`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "PAYPEE_ACCESSTOKEN"
                )}`,
              },
              params: { id: transactionId },
            })
            .then((res) => {
              return res.data;
            })
            .then((res) => {
              alert(res.message);
            })
            .catch(() => {
              alert("Can't Delete");
            });
        });
      });
  };

  useEffect(() => {
    getCurrentData();
  }, []);
  return (
    <div className="w-full  flex flex-col justify-center items-center gap-[30px]">
      <div className="text-[32px] mt-[50px]">XÓA ĐƠN HÀNG</div>
      <input
        onChange={(e) => handleInputChange(e)}
        className="w-[500px] border border-[#333] text-[32px] px-[12px]"
        type="text"
      />
      <button
        onClick={deleteTransaction}
        className="w-[150px] h-[50px] border border-[#333] text-[24px] hover:text-[#fff] hover:bg-black"
      >
        XÓA
      </button>
    </div>
  );
};

export default AdminPage;
