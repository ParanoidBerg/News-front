import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    comments: [],
    singleComment: [],
    error: null,
    
}

export const getComments = createAsyncThunk('comments/get', async(id, thunkAPI)=>{
    try{
        const res = await fetch(`http://localhost:4000/comments/${id}`)
        const data = await res.json()
        return data
    }catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
})
export const getAllComments = createAsyncThunk('commentsAll/get', async(_, thunkAPI)=>{
    try{
        const res = await fetch(`http://localhost:4000/comments`)
        const data = await res.json()
        return data
    }catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
})

export const postComment = createAsyncThunk('comments/post', async({text, id}, thunkAPI)=>{
  const state = thunkAPI.getState()
    try{
        const res = await fetch("http://localhost:4000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${state.auth.token}`
       },
        body: JSON.stringify({ commentText: text, newsId: id }),
      });
      return res.json();
    }catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
})

export const delComments = createAsyncThunk("comments/del", async (el, thunkAPI) => {
  const state = thunkAPI.getState()
    try {
      await fetch(`http://localhost:4000/comments/${el._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${state.auth.token}`
       },
      });
      return el._id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  });

  export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
               .addCase(getComments.fulfilled, (state, action)=>{
                    state.comments = action.payload
                    state.error = null
               })
               .addCase(getComments.rejected, (state, action)=>{
                    state.error = action.payload
               })
               .addCase(postComment.fulfilled, (state, action)=>{
                    state.comments.push(action.payload)
               })
               .addCase(postComment.rejected, (state, action)=>{
                    state.error = action.payload
               })
               .addCase(delComments.fulfilled, (state, action)=>{
                    state.comments = state.comments.filter((i)=>i._id !== action.payload)
               })
               .addCase(getAllComments.fulfilled, (state, action)=>{
                    state.singlecomment = action.payload
                    
               })

    }
  })
  export default commentsSlice.reducer