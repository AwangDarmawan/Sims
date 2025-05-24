// src/features/profileSlice.ts
// import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { handleAxiosError } from "../utils/errorhandle";
import { ApiGetPpob, type IApiPpob } from "../services/Ppob";


interface PpobState {
  data: IApiPpob[];
  loading: boolean;
  error: string | null;
}

const initialState: PpobState = {
  data: [],
  loading: false,
  error: null,
};


export const fetchPpob = createAsyncThunk<IApiPpob[]>(
  "ppob/fetchPpob",
  async (_, thunkAPI) => {
    try {
      const res = await ApiGetPpob();
      console.log("apiPpob", res)
      return res.data;
    } 
    catch (error: unknown) {
      const message = handleAxiosError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);







const ppobSlice = createSlice({
  name: "ppob",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // fetch
    builder
      .addCase(fetchPpob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPpob.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPpob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

       

     

  },
});

export default ppobSlice.reducer;
