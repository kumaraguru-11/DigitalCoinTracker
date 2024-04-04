import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  coins: [],
  coinsSource: [],
  coinslist: [],
  error: "",
};
export const fetchCoins = createAsyncThunk("coin/fetchcoins", async () => {
  const response = await axios.get(
    "https://coinranking1.p.rapidapi.com/coins?limit=50",
    {
      headers: {
        "X-RapidAPI-Key": "b0e5fdedf1msh31670962ccd7408p140db3jsne4f802e641e3",
      },
    }
  );
  return response.data;
});
const coinsSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    sorted: (state, action) => {
      state.coins = {
        ...state.coins,
        data: { ...state.coinslist.data, coins: action.payload },
      };
    },
    modified: (state, action) => {
      state.coinslist = {
        ...state.coinslist,
        data: { ...state.coinslist.data, coins: action.payload },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCoins.fulfilled, (state, action) => {
      state.loading = false;
      state.coins = action.payload;
      state.coinsSource = action.payload;
      state.coinslist = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCoins.rejected, (state, action) => {
      state.loading = false;
      state.coins = [];
      state.coinsSource = [];
      state.coinslist = [];
      state.error = action.error.message;
    });
  },
});

export default coinsSlice.reducer;
export const { sorted, modified } = coinsSlice.actions;
