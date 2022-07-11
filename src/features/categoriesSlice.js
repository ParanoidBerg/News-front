import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    cats: [],
    error: null,
    loading: false
}

export const getCats = createAsyncThunk("cats/get", async (_, thunkAPI)=>{
    try{
        const res = await fetch("http://localhost:4000/categories")
        const data = await res.json()
return data
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
             state.loading = false

           })
           .addCase(getCats.rejected, (state, action)=>{
            state.error = 'xcs'
            state.loading = false
           })

           .addCase(getCats.pending, (state, action) => {
            state.loading = true
           })
    }
})
export default catsSlice.reducer