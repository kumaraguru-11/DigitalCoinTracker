import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  stats: {},
  error: "",
};

export const fetchMarketStats = createAsyncThunk(
  "market/fetchMarketStats",
  async (options) => {
    try {
      const response = await axios.get(
        "https://alpha-vantage.p.rapidapi.com/query",
        options
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);



const marketSlice = createSlice({
  name: "market",
  initialState,
//   reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchMarketStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default marketSlice.reducer;