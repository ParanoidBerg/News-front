import { configureStore } from "@reduxjs/toolkit"
import { catsSlice } from "../features/categoriesSlice";

export const store = configureStore({
    reducer: catsSlice
  });