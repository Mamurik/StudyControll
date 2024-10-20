import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser } from "../../API/api";

interface UserState {
  isAuth: boolean;
  user: IUser | null;
}

const initialState: UserState = {
  isAuth: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null; 
    },
  },
});

export const { setIsAuth, setUser, logout } = userSlice.actions;

export const selectIsAuth = (state: RootState) => state.user.isAuth;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
