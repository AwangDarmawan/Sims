import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiGetSaldo,   ApiPostPembayaran,  ApiPostTopup, type PembayaranRequest, type PembayaranResponse, type SaldoUser, type TopUpRequest} from "../services/transaksi";
import { handleAxiosError } from "../utils/errorhandle";
import { toast } from "react-toastify";


interface TransaksiState {
  data: SaldoUser | null;
  pembayaran: PembayaranResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: TransaksiState = {
  data: null,
  pembayaran: null,
  loading: false,
  error: null,
 
  
};

// get saldo
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
      toast.success(res.message);
      return res.data; // SaldoUser
    } catch (error) {
      const message = handleAxiosError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postPembayaran = createAsyncThunk(
  "transaksi/postPembayaran",
  async (data: PembayaranRequest, thunkAPI) => {
    try {
      const res = await ApiPostPembayaran(data);
      toast.success(res.message);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAxiosError(error));
    }
  }
);


// history







const transaksiSlice = createSlice({
  name: "transaksi",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
     // getsaldo
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

      // topup
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

      // pembayaran
      builder
         .addCase(postPembayaran.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postPembayaran.fulfilled, (state, action) => {
        state.loading = false;
        state.pembayaran = action.payload;
         if (state.data) {
        state.data.balance -= action.payload.total_amount;
       }
      })
      .addCase(postPembayaran.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      
  
     },
});

export default transaksiSlice.reducer;
