import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/dataSlice';
import { DataState } from '../features/dataSlice';


export interface RootState {
  data: DataState;
  status: string;
  error: string | null;
}

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = RootState;

export default store;
