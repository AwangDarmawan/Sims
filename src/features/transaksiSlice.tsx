import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiGetSaldo, ApiPostTopup, type SaldoUser, type TopUpRequest } from "../services/transaksi";
import { handleAxiosError } from "../utils/errorhandle";

interface TransaksiState {
  data: SaldoUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: TransaksiState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk
export const fetchSaldo = createAsyncThunk(
  "saldo/fetchSaldo",
   async (_, thunkAPI) => {
      try {
        const res = await ApiGetSaldo();
        console.log("apisaldo", res)
        return res.data;
      } 
      catch (error: unknown) {
        const message = handleAxiosError(error);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  // POST TOPUP
export const postTopUp = createAsyncThunk(
  "transaksi/postTopUp",
  async (data: TopUpRequest, thunkAPI) => {
    try {
      const res = await ApiPostTopup(data);
      return res.data; // SaldoUser
    } catch (error) {
      const message = handleAxiosError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
 


const transaskiSlice = createSlice({
  name: "transaksi",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaldo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSaldo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSaldo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

       builder
       .addCase(postTopUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postTopUp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postTopUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  
  },
});

export default transaskiSlice.reducer;
