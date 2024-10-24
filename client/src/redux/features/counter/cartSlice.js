import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  status: "idle",
  error: "",
  amount: 0,
};

const calculateTotalAmount = (cart) => {
  return cart.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const checkExistProductInCart = state.cart.some((product) => {
        return product.productId === action.payload.productId;
      });
      if (!checkExistProductInCart) {
        state.cart.push(action.payload);
        console.log(action.payload);
        
        // alert("thêm sản phẩm vào giỏ hàng thành công");
      }
      state.amount = calculateTotalAmount(state.cart);
    },
    increaseProductQuantity(state, action) {
        const index = state.cart.findIndex((product) => product.productId === action.payload);
        
        if (index !== -1) {
            state.cart[index].quantity += 1;
        }

        state.amount = calculateTotalAmount(state.cart);
    },
    decreaseProductQuantity(state, action) {
        const index = state.cart.findIndex((product) => product.productId === action.payload);
        
        if (index !== -1 && state.cart[index].quantity!==0) {
            state.cart[index].quantity -= 1;
        }

        state.amount = calculateTotalAmount(state.cart);
    },
    removeProduct(state, action){
      const index = state.cart.findIndex((product) => product.productId === action.payload);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
      state.amount = calculateTotalAmount(state.cart);
    }
  },
});

// Action creators are generated for each case reducer function
// export const {  } = productsSlice.actions

export const { addProductToCart, increaseProductQuantity, decreaseProductQuantity, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
