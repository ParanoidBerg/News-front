import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../features/authSlice";
import categoriesSlice from "../features/categoriesSlice";
import commentsSlice from "../features/commentSlice"
import newsSlice from "../features/newsSlice";

export const store = configureStore({
    reducer: {
    cats: categoriesSlice,
    news: newsSlice,
    comments: commentsSlice,
    auth: authSlice
    }
    
  });