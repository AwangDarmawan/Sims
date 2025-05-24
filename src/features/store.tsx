// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./loginSlice"
import profilReducer from "./profilSlice"
import transaksiReducer from "./transaksiSlice"
import bannerReducer from "./bannerSlice"
import ppobReducer from "./ppobSlice"

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profilReducer, 
    transaksi: transaksiReducer,
    banner : bannerReducer, 
    ppob : ppobReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store; 