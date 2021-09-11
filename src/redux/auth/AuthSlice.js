import { createSlice } from "@reduxjs/toolkit";
import * as authOperations from "./authOperations";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
  registerUserRejected: false,
  logInUserRejected: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [authOperations.registerUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.registerUserRejected = false;
    },

    [authOperations.registerUser.rejected](state, _) {
      state.registerUserRejected = true;
    },

    [authOperations.registerUserRejected](state, _) {
      state.registerUserRejected = false;
    },

    [authOperations.logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.logInUserRejected = false;
    },

    [authOperations.logIn.rejected](state, _) {
      state.logInUserRejected = true;
    },

    [authOperations.logInUserRejected](state, _) {
      state.logInUserRejected = false;
    },

    [authOperations.logOut.fulfilled](state, _) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },

    [authOperations.getUserInfo.pending](state, _) {
      state.isFetchingCurrentUser = true;
    },

    [authOperations.getUserInfo.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isFetchingCurrentUser = false;
    },

    [authOperations.getUserInfo.rejected](state, _) {
      state.isFetchingCurrentUser = false;
    },
  },
});

export default authSlice.reducer;