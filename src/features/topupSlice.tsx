import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { topUpBalance } from '../services/Topup';
import { handleAxiosError } from '../utils/errorhandle';
import { toast } from "react-toastify";

interface TopUpState {
  balance: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  message: string | null;
}

const initialState: TopUpState = {
  balance: 0,
  status: 'idle',
  error: null,
  message: null,
};

export const fetchTopUp = createAsyncThunk(
  'topup/fetchTopUp',
  async (amount: number, thunkAPI) => {
    try {
      const res = await topUpBalance(amount);
      console.log("topup api", res)
        toast.success( res.message );
      return res;
    } catch (error) {
          const message = handleAxiosError(error);
          return thunkAPI.rejectWithValue(message);
        }
      }
 );

const topUpSlice = createSlice({
  name: 'topup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopUp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.message = null;
      })
      .addCase(fetchTopUp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.balance = action.payload.data.balance;
        state.message = action.payload.message;
      })
      .addCase(fetchTopUp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default topUpSlice.reducer;

