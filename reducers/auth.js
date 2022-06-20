import { createSlice } from "@reduxjs/toolkit";
import User from "../API/User";

// const userModel = new User();

const initialState = {
  user: {},
  isLoading: true,
  isError: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startFetching: (state) => ({
      ...state,
      isLoading: true,
      isError: false,
      error: "",
    }),
    setUser: (state, action) => ({
      user: action.payload,
      isLoading: false,
      isError: false,
      error: "",
    }),
    addContact: (state, action) => {
      state.user.contacts.push(action.payload);
    },
    setError: (sate, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      error: action.payload,
    }),
  },
});

export default authSlice;
