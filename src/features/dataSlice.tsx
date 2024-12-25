import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductSalesData } from '../App';

export interface DataState {
  items: ProductSalesData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DataState = {
  items: [],
  status: 'idle',
  error: null,
};

const BASE_URL = process.env.PUBLIC_URL || '/stackline-frontend-assessment';
const apiUrl = `${BASE_URL}/api/stackline_frontend_assessment_data_2021.json`;

export const fetchData = createAsyncThunk<ProductSalesData[], void>(
  'data/fetchData',
  async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<ProductSalesData[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default dataSlice.reducer;
