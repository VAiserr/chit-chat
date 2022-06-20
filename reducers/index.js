import { combineReducers } from "redux";
import authSlice from "./auth";
import chatSlice from "./chat";
import serviceSlice from "./service";

const reducer = combineReducers({
  auth: authSlice.reducer,
  // service: serviceSlice,
  chat: chatSlice.reducer,
});

export default reducer;
