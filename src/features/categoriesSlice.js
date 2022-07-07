import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    cats: [],
    error: null
}

export const getCats = createAsyncThunk("cats/get", async (_, thunkAPI)=>{
    try{
        const res = await fetch("https://localhost:4000/categories")
        const data = await res.json()

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
          } else {
            return thunkAPI.fulfillWithValue(data);
          }
    }catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
})

export const catsSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
           .addCase(getCats.fulfilled, (state, action)=>{
             state.cats = action.payload
             state.error = null

           })
           .addCase(getCats.rejected, (state, action)=>{
            state.error = action.payload
           })
    }
})
export default catsSlice.reducer