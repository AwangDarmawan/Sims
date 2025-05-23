import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ApiLogin, type IAuthResponse, type ILoginForm } from "../services/Auth";
import { toast } from 'react-toastify'
import { handleAxiosError } from "../utils/errorhandle";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"), 
  loading: false,
  error: null,
};


export const loginUser = createAsyncThunk<IAuthResponse, ILoginForm>(
  "auth/loginUser",
  async (formData, thunkAPI) => {
    try {
      const response = await ApiLogin(formData);
      console.log("response login", response);
      console.log("response login token", response.data.token);
      toast.success(response.message || "Login berhasil!");
      return response;
    } catch (error: unknown) {
      const message = handleAxiosError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Slice
const LoginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // state.token = null;
      // localStorage.removeItem("token");
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      toast.info("Berhasil logout.");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        localStorage.setItem("token", action.payload.data.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = LoginSlice.actions;
export default LoginSlice.reducer;
