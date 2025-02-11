import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedState = {
  isLoading: boolean;
  isError: boolean;
  feed: {
    total: number;
    totalToday: number;
  };
  orders: TOrder[];
};

const initialState: TFeedState = {
  isLoading: false,
  isError: false,
  feed: {
    total: 0,
    totalToday: 0
  },
  orders: []
};

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.isError = false; // Сброс ошибки при начале нового запроса
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
        state.orders = action.payload.orders;
        state.isError = false; // Сброс ошибки после успешного получения данных
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.feed = { total: 0, totalToday: 0 }; // Сброс данных при ошибке
        state.orders = []; // Сброс данных при ошибке
      });
  }
});

export const { getFeedState } = feedSlice.selectors;
export default feedSlice.reducer;
