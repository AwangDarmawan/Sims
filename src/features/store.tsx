// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./loginSlice"
import profilReducer from "./profilSlice"
import saldoReducer from "./saldoSlice"
import bannerReducer from "./bannerSlice"
import ppobReducer from "./ppobSlice"
import topupReducer from "./topupSlice"
export const Store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profilReducer, 
    saldo: saldoReducer,
    banner : bannerReducer, 
    ppob : ppobReducer,
    topup: topupReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store; 