import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    comments: [],
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

export const postComment = createAsyncThunk('comments/post', async(text, thunkAPI)=>{
    try{
        const res = await fetch("http://localhost:4000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      return res.json();
    }catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
})

export const delComments = createAsyncThunk("comments/del", async (el, thunkAPI) => {
    try {
      await fetch(`http://localhost:4000/comments/${el._id}`, {
        method: "DELETE",
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

    }
  })
  export default commentsSlice.reducer