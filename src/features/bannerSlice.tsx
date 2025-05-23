// src/features/profileSlice.ts
// import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { handleAxiosError } from "../utils/errorhandle";
import { ApiGetBanner, type IApiBanner } from "../services/Banner";


interface BannerState {
  data: IApiBanner[];
  loading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  data: [],
  loading: false,
  error: null,
};


export const fetchBanner = createAsyncThunk<IApiBanner[]>(
  "banner/fetchBanner",
  async (_, thunkAPI) => {
    try {
      const res = await ApiGetBanner();
      console.log("apiBanner", res)
      return res.data;
    } 
    catch (error: unknown) {
      const message = handleAxiosError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);







const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // fetch
    builder
      .addCase(fetchBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

       

     

  },
});

export default bannerSlice.reducer;
