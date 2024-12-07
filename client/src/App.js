import { useEffect } from "react";
import MainRoute from "./routes/routes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserAccount } from "./redux/features/counter/userSlice";

const refreshAccessToken = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/users/refresh', { withCredentials: true });
    const newAccessToken = response.data.accessToken;
    localStorage.setItem('PAYPEE_ACCESSTOKEN', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("FAILED TO REFRESH TOKEN1");
    localStorage.removeItem('PAYPEE_ACCESSTOKEN');
    return null;
  }
};

const current = async () => {
  try {
    const accessToken = localStorage.getItem('PAYPEE_ACCESSTOKEN');
    let config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const responseData = await axios.get('http://localhost:8000/api/users/current', config);
    return responseData.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        let config = {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        };
        try {
          const responseData = await axios.get('http://localhost:8000/api/users/current', config);
          return responseData.data;
        } catch (err) {
          console.error("FAILED TO REFRESH TOKEN");
        }
      }
    }

    // Nếu không thể làm mới hoặc có lỗi khác, trả về mặc định
    return {
      email: "",
      id: "",
      role: "",
      username: "",
      vip: 0,
    };
  }
};


function App() {
  const reduxDispatch = useDispatch();
  useEffect(()=>{
    current().then((res)=>{reduxDispatch(setUserAccount(res))});
  },[])
  return (
    <MainRoute />
  );
}

export default App;
