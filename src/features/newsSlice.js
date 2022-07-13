import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    news: [],
    loading: false,
    error: null,
}

export const getNews = createAsyncThunk('news/get', async(_, thunkAPI)=>{
    try{
        const res = await fetch("http://localhost:4000/news")
        const data = await res.json()
        return data
    }catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
})
export const getNewsById = createAsyncThunk('news/get', async(el, thunkAPI)=>{
    try{
        const res = await fetch(`http://localhost:4000/news${el._id}`)
        const data = await res.json()
        return data
    }catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
})

export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(getNews.fulfilled, (state, action)=>{
                state.news = action.payload
                state.loading = false
                state.error = null
                state.likes = 0
            })
            .addCase(getNews.pending, (state, action)=>{
                state.loading = true 
            })
            .addCase(getNews.rejected, (state, action)=>{
                state.error = action.payload
                state.loading = false
            })
    }
})
export default newsSlice.reducer