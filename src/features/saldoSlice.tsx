import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiGetSaldo, type SaldoUser } from "../services/Saldo";
import { handleAxiosError } from "../utils/errorhandle";

interface SaldoState {
  data: SaldoUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: SaldoState = {
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
 


const saldoSlice = createSlice({
  name: "saldo",
  initialState,
  reducers: {},
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
  },
});

export default saldoSlice.reducer;
