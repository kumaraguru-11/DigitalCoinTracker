import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "../Slice/CoinsSlice";
import marketReducer from '../Slice/StatsSlice';

const store = configureStore({
  reducer: {
    coins: coinReducer,
    stats:marketReducer
  },
});

export default store;
