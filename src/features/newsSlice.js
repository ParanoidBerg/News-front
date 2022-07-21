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
        const res = await fetch(`http://localhost:4000/news/${el._id}`)
        const data = await res.json()
        return data
    }catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
})
export const delNews = createAsyncThunk('news/delete', async(id, thunkAPI)=>{
    const state = thunkAPI.getState()
    try{
        await fetch(`http://localhost:4000/news/${id}`,{
          method: "DELETE",
          headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${state.auth.token}`
       },
       })
        return id
    }catch (e) {
    return thunkAPI.rejectWithValue(e)
    }
})

export const postNews = createAsyncThunk('news/post', async({title, text, category, pict}, thunkAPI)=>{
    const state = thunkAPI.getState()
      try{
          const formData = new FormData()
          formData.append("title", title)
          formData.append("text", text)
          formData.append("categoriesId", category)
          formData.append("assets", pict)

          console.log(title, text, category, pict)

          const res = await fetch("http://localhost:4000/news", {
          method: "POST",
          headers: { 
          Authorization: `Bearer ${state.auth.token}`
         },
          body: formData,
        });

        const data = await res.json()
       
        if (data.error) {
            return thunkAPI.rejectWithValue(data.error)
        } else {
            return thunkAPI.fulfillWithValue(data)
        }

      }catch (e) {
          return thunkAPI.rejectWithValue(e.message);
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
            .addCase(delNews.fulfilled, (state, action)=>{
                state.news = state.news.filter((i)=>i._id !== action.payload)
            })
            .addCase(delNews.rejected, (state, action)=>{
                state.error = action.payload
                state.loading = false
            })
            .addCase(postNews.fulfilled, (state, action)=>{
                state.news.push(action.payload)
            })

            .addCase(postNews.rejected, (state, action)=>{
                state.error = action.payload
            })
    }
})
export default newsSlice.reducer