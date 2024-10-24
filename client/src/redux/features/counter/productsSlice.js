import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllProducts, getProductById } from '../../../firebase/firebase'

const initialState = {
  products: [],
  status: "idle",
  error: "",
  productDetail: {}
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await getAllProducts();
    
    return response;
    
  },
)

export const queryProductById = createAsyncThunk(
  'product/queryProductById',
  async (id) => {
    const response = await getProductById(id);
    
    return response;
    
  },
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    
  },
  extraReducers:(builder)=>{
    builder
      .addCase(fetchProducts.pending,(state,action)=>{
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled,(state,action)=>{
        state.status = "successed";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected,(state,action)=>{
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(queryProductById.pending,(state,action)=>{
        state.status = "loading";
      })
      .addCase(queryProductById.fulfilled,(state,action)=>{
        state.status = "successed";
        state.productDetail = action.payload;
      })
      .addCase(queryProductById.rejected,(state,action)=>{
        state.status = "failed";
        state.error = action.error;
      })
  },
  
})

// Action creators are generated for each case reducer function
// export const {  } = productsSlice.actions

export default productsSlice.reducer