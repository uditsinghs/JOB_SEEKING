import authSliceReducer from "@/features/authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { auth: authSliceReducer },
});
