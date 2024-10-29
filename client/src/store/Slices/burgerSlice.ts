import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BurgerSliceState {
  isOpen: boolean;
}

const initialState: BurgerSliceState = {
  isOpen: false,
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload; 
    },
  },
});

export const { setIsOpen } = burgerSlice.actions;
export default burgerSlice.reducer;