import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  socket: null,
  lastMessage: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    addChat: (state, action) => {
      state.chats.push(action.payload);
    },
    deleteChat: (state, action) => {
      state.chats = state.chats.filter((chat) => chat._id !== action.payload);
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setLastMessage: (state, action) => {
      state.lastMessage = action.payload;
    },
  },
});

export default chatSlice;
