// src/features/profileSlice.ts
import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGetProfile,
   ApiUpdateProfileName, 
   ApiUploadProfileImage,
  type IUserProfile,
  type IUpdateProfileName  } 
  from "../services/Profildata";
import { handleAxiosError } from "../utils/errorhandle";

interface ProfileState {
  data: IUserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};


export const fetchProfile = createAsyncThunk<IUserProfile>(
  "profile/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await ApiGetProfile();
      console.log("apiprofil", res)
      return res.data;
    } 
    catch (error: unknown) {
      const message = handleAxiosError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk: Update Profile
export const updateName = createAsyncThunk<IUserProfile, IUpdateProfileName >(
  "profile/updateName",
  async (payload, thunkAPI) => {
    try {
      const res = await ApiUpdateProfileName(payload);
      console.log("editprofil", res)
      toast.success( res.message );
      return res.data;
    } catch (error) {
      const message = handleAxiosError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Upload Profile Image Thunk
export const uploadProfileImage = createAsyncThunk<IUserProfile, File>(
  "profile/uploadImage",
  async (file, thunkAPI) => {
    try {
      const res = await ApiUploadProfileImage(file);
      toast.success(res.message);
      return res.data;
    } catch (error) {
      const message = handleAxiosError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);



const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // fetch
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

        // Update profile
    builder
      .addCase(updateName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateName.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      builder
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

     

  },
});

export default profileSlice.reducer;
