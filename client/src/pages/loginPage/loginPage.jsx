import React, { useEffect, useState } from "react";
import loginImage from "../../assets/images/login-image.png";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { setUserAccount } from "../../redux/features/counter/userSlice";
import { useDispatch } from "react-redux";


const LoginPage = () => {
  const [registerForm, setRegisterForm] = useState(false);
  const navigate = useNavigate();
  const [userLoginData,setUserLoginData] = useState({
    email:"",
    password:""
  })
  const [userRegisterData,setUserRegisterData] = useState({
    email:"",
    password:"",
    username:""
  })

  const reduxDispatch = useDispatch();

  useEffect(() => {
    setRegisterForm(false);
  }, []);

  const handleChangeFormClick = () => {
    if (registerForm) {
      setRegisterForm(false);
    } else {
      setRegisterForm(true);
    }
    setUserLoginData({
        email:"",
        password:""
    })
  };

  const handleLoginDataChange = (e) => {
    if(e.target.id==="email"){
        setUserLoginData({
            ...userLoginData,
            email:e.target.value,
            
        })
    }
    if(e.target.id==="loginPassword"){
        setUserLoginData({
            ...userLoginData,
            password:e.target.value,
            
        })
    }
  }

  const handleRegisterDataChange = (e) => {
    if(e.target.id==="registerEmail"){
        setUserRegisterData({
            ...userRegisterData,
            email:e.target.value,
            
        })
    }
    if(e.target.id==="registerPassword"){
        setUserRegisterData({
            ...userRegisterData,
            password:e.target.value,
        })
    }
    if(e.target.id==="username"){
        setUserRegisterData({
            ...userRegisterData,
            username:e.target.value,
        })
    }
  }

  const handleSignupClick = async ()=>{
    try {
      if(!userRegisterData.email||!userRegisterData.password||!userRegisterData.username){
        alert("need fill")
      }else{
        const payloadObject = {
          email: userRegisterData.email,
          username: userRegisterData.username,
          password: userRegisterData.password,
        }
        const responseData = await axios.post('http://localhost:8000/api/users/register',payloadObject);
        if(responseData){
          alert(`${responseData.data.username} registered!`);
          handleChangeFormClick();
          setRegisterForm({
            email:"",
            password:"",
            username:""
          });
        }
        
      }
    } catch (error) {
      alert(error.response.data.message)
    }
    
  }

  const decodeBase64 = (encodedData) => {
    try {
        return atob(encodedData);
    } catch (error) {
        console.error("Lỗi khi giải mã Base64:", error);
        return null;
    }
};

  const handleLoginClick = async ()=>{
    try {
      if(!userLoginData.email||!userLoginData.password){
        alert("need fill")
      }else{
        const payloadObject = {
          email: userLoginData.email,
          password: userLoginData.password,
        }
        const responseData = await axios.post('http://localhost:8000/api/users/login',payloadObject,{ withCredentials: true });
        localStorage.setItem('PAYPEE_ACCESSTOKEN',responseData.data.accessToken);
        const userData = JSON.parse(decodeBase64(responseData.data.accessToken.split(".")[1])).user;
        if (userData.role==="admin") {
          reduxDispatch(setUserAccount(userData));
          navigate("/admin");
        }else{
          reduxDispatch(setUserAccount(userData));
          navigate("/");
        }
      }
    } catch (error) {
      alert(error.response.data.message)
    }
    
  }

  return registerForm ? (
    <div className=" w-[1167px] mx-auto flex flex-row justify-between mt-[120px]">
      <img src={loginImage} alt="login-image" />
      <div className="w-[500px] h-[700px] shadow-lg flex flex-col justify-center items-center">
        <div className=" text-[32px] text-[#2C698D]">REGISTER</div>
        <div className="mt-[20px]">
          <svg
            width="42"
            height="43"
            viewBox="0 0 42 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_677_203"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="42"
              height="43"
            >
              <path
                d="M1 6.5567L21.01 1.43726L41 6.5567V17.0547C40.9992 22.4347 39.0676 27.6782 35.4787 32.0425C31.8899 36.4068 26.8257 39.6707 21.0033 41.372C15.1788 39.6714 10.1125 36.4072 6.52234 32.0418C2.93212 27.6765 1.00009 22.4314 1 17.0498V6.5567Z"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M11 19.9436L18.7778 26.7617L32.1111 15.0735"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </mask>
            <g mask="url(#mask0_677_203)">
              <path
                d="M-5.66699 -2.45874H47.6663V44.2941H-5.66699V-2.45874Z"
                fill="#2C698D"
              />
            </g>
          </svg>
        </div>
        <input
          placeholder="Email"
          type="text"
          className="w-[450px] h-[70px] mt-[70px] border border-[#2C698D] px-[30px] text-[16px] rounded-md"
          id="registerEmail"
          value={userRegisterData.email}
          onChange={(e)=>handleRegisterDataChange(e)}
        />
        <input
          placeholder="Username"
          type="text"
          className="w-[450px] h-[70px] mt-[15px] border border-[#2C698D] px-[30px] text-[16px] rounded-md"
          id="username"
          value={userRegisterData.username}
          onChange={(e)=>handleRegisterDataChange(e)}
        />
        <input
          placeholder="Password"
          type="password"
          className="w-[450px] h-[70px] mt-[15px] border border-[#2C698D] px-[30px] text-[16px] rounded-md"
          id="registerPassword"
          value={userRegisterData.password}
          onChange={(e)=>handleRegisterDataChange(e)}
        />
        <div onClick={handleChangeFormClick} className="w-[450px] flex items-center gap-2 mt-[15px] cursor-pointer text-[#2C698D]">
            Already have a account?
        </div>
        <Link to="/login" className="mt-[20px]" onClick={handleSignupClick}>
          <button className="w-[450px] h-[70px]  border text-[#fff] px-[30px] text-[32px] bg-[#2C698D] rounded-md">
            SIGN UP
          </button>
        </Link>
      </div>
    </div>
  ) : (
    <div className=" w-[1167px] mx-auto flex flex-row justify-between mt-[120px]">
      <img src={loginImage} alt="login-image" />
      <div className="w-[500px] h-[700px] shadow-lg flex flex-col justify-center items-center">
        <div className=" text-[32px] text-[#2C698D]">LOGIN</div>
        <div className="mt-[20px]">
          <svg
            width="42"
            height="43"
            viewBox="0 0 42 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_677_203"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="42"
              height="43"
            >
              <path
                d="M1 6.5567L21.01 1.43726L41 6.5567V17.0547C40.9992 22.4347 39.0676 27.6782 35.4787 32.0425C31.8899 36.4068 26.8257 39.6707 21.0033 41.372C15.1788 39.6714 10.1125 36.4072 6.52234 32.0418C2.93212 27.6765 1.00009 22.4314 1 17.0498V6.5567Z"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M11 19.9436L18.7778 26.7617L32.1111 15.0735"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </mask>
            <g mask="url(#mask0_677_203)">
              <path
                d="M-5.66699 -2.45874H47.6663V44.2941H-5.66699V-2.45874Z"
                fill="#2C698D"
              />
            </g>
          </svg>
        </div>
        <input
          placeholder="Email"
          type="text"
          className="w-[450px] h-[70px] mt-[70px] border border-[#2C698D] px-[30px] text-[16px] rounded-md"
          id="email"
          onChange={(e)=>handleLoginDataChange(e)}
          value={userLoginData?.email}
        />
        <input
          placeholder="Password"
          type="password"
          className="w-[450px] h-[70px] mt-[15px] border border-[#2C698D] px-[30px] text-[16px] rounded-md"
          id="loginPassword"
          onChange={(e)=>handleLoginDataChange(e)}
          value={userLoginData?.password}
        />
        <div className="w-[450px] flex items-center gap-2 mt-[15px]">
          <input type="checkbox" name="remember me" /> Remember me
        </div>
        <Link to="/login" className="mt-[20px]" >
          <button onClick={handleLoginClick} className="w-[450px] h-[70px]  border text-[#fff] px-[30px] text-[32px] bg-[#2C698D] rounded-md">
            LOGIN
          </button>
        </Link>
        <Link
          to="/login"
          className="w-[450px] underline text-[#2C698D] text-[16px] flex justify-end"
        >
          Forgot assword?
        </Link>
        <button
          onClick={handleChangeFormClick}
          className="w-[450px] h-[70px] mt-[20px] border text-[#2C698D] px-[30px] text-[32px] bg-[#fff] rounded-md shadow-md"
        >
          REGISTER A ACCOUNT
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
