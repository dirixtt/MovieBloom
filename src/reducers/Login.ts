import { createSlice } from "@reduxjs/toolkit";

interface LoginState {
  user: Object | null;
  loading: boolean;
  error: any;
}

const initialState: LoginState = {
  user: null,
  loading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: "Login",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    LoginFailture: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, LoginFailture } = loginSlice.actions;

export default loginSlice.reducer;
