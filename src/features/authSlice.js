import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  signingUp: false,
  signingIn: false,
  isFullf: false,
  error: null,
  token: localStorage.getItem("token")
}



