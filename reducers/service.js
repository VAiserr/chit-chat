import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "service",
  initialState: {},
  reducers: {
    setService: (state, action) => ({
      data: action.payload,
      isFetching: false,
      isError: false,
      error: "",
    }),
  },
});

export default serviceSlice;
