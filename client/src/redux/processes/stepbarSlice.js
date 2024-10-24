import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    step: {
        one: true,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false
    },
    status: "idle",
    error: "",
    
}

export const stepbarSlice = createSlice({
    name: 'userInformation',
    initialState,
    reducers: {
      setStep(state,action){
        state.step = action.payload;
      },
    },
  })

  export const { setStep } = stepbarSlice.actions;
  export default stepbarSlice.reducer