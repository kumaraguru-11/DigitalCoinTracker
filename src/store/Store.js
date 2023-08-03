import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "../features/CoinsSlice";
import uuidReducer from "../features/UuidSlice";

const store = configureStore({
  reducer: {
    coins: coinReducer,
    uuid: uuidReducer,
  },
});

export default store;
