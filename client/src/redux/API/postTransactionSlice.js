import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { AES } from '../../classes/AES'

const initialState = {
  response: {
    time: "",
    status: "",
    transactionId: "",
  },
  status: "idle",
  error: "",
}

export const postTransaction = createAsyncThunk(
  'API/postTransaction',
  async (payloadObject) => {
    const responseData = await axios.post('http://localhost:8000/api/transaction/postTransaction',payloadObject);
    const aes = new AES();
    const decryptedData = {
      time: aes.runDecrypt(responseData.data.time,process.env.REACT_APP_AES_KEY),
      status: aes.runDecrypt(responseData.data.status,process.env.REACT_APP_AES_KEY),
      transactionId: aes.runDecrypt(responseData.data.transactionId,process.env.REACT_APP_AES_KEY),

    };
    console.log(decryptedData);
    
    return decryptedData;
  },
)

export const postTransactionSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    
  },
  extraReducers:(builder)=>{
    builder
      .addCase(postTransaction.pending,(state,action)=>{
        state.status = "loading";
      })
      .addCase(postTransaction.fulfilled,(state,action)=>{
        state.status = "successed";
        state.response = action.payload;
      })
      .addCase(postTransaction.rejected,(state,action)=>{
        state.status = "failed";
        state.error = action.error;
      })
  },
  
})

// export const {  } = postTransactionSlice.actions

export default postTransactionSlice.reducer