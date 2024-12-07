import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    userAccount:{
      email:"",
      id:"",
      role:"",
      username:"",
      vip:0
    },
    userInformation:{
        name:"",
        address:"",
        note:"",
        phone:""
    },
    paymentMethod:"",
    cardInformation:{
      cardNumber:"",
      expirtTime:"",
      cardHolder:"",
      CSC:"",

    },
    status: "idle",
    error: "",
    
}

export const userSlice = createSlice({
    name: 'userInformation',
    initialState,
    reducers: {
      setUserName(state, action){
        state.userInformation.name = action.payload;
      },
      setUserAddress(state, action){
        state.userInformation.address = action.payload;
      },
      setUserPhone(state, action){
        state.userInformation.phone = action.payload;
      },
      setUserNote(state, action){
        state.userInformation.note = action.payload;
      },
      setPaymentMethod(state, action){
        state.paymentMethod = action.payload;
      },
      setCardInformation(state, action){
        state.cardInformation = action.payload;
      },
      setUserAccount(state, action){
        state.userAccount = action.payload;
        // console.log(action.payload);
      }
    },
  })

  export const { setUserName,setUserAddress,setUserPhone,setUserNote,setPaymentMethod,setCardInformation, setUserAccount } = userSlice.actions;
  export default userSlice.reducer