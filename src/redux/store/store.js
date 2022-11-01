import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "../reducer/reducers";

export const store = configureStore({
  reducer: reducers,
  devTools: true
})