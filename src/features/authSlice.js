import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  signingUp: false,
  signingIn: false,
  isFulf: false,
  error: null,
  token: localStorage.getItem("token"),
  users: [],
  name: localStorage.getItem("name"),
  user: localStorage.getItem("user"),
  admin: localStorage.getItem("admin")
};

export const getUser = createAsyncThunk("user/get", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/users");
    const data = await res.json();
    if (data.error) {
      return thunkAPI.rejectWithValue(data.error);
    } else {
      return thunkAPI.fulfillWithValue(data);
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

export const createUser = createAsyncThunk(
  "auth/signup",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        body: JSON.stringify({ login, password }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const authorizate = createAsyncThunk(
  "auth/login",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ login, password }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name)
        localStorage.setItem("user", data.user)
        localStorage.setItem("admin", data.admin)
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const delUser = createAsyncThunk('auth/del', async (id, thunkAPI)=>{
  const state = thunkAPI.getState()
  try{
    await fetch(`http://localhost:4000/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${state.auth.token}`
       },
      });
      return id
  }catch (error) {
    thunkAPI.rejectWithValue(error);
  }
})

export const logOut = createAsyncThunk('logOut', async(_, thunkAPI)=>{
  localStorage.clear()
})

export const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.authorization = action.payload;
        state.signingUp = false;
        state.error = null;
        state.isFulf = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = "Данное имя пользователя уже существует";
        state.signingUp = false;
      })
      .addCase(createUser.pending, (state, action) => {
        state.error = null;
      })
      .addCase(authorizate.fulfilled, (state, action) => {
        state.authorization = action.payload;
        state.signingIn = true;
        state.error = null;
        state.token = action.payload.token;
        state.isFulf = true;
        state.user = action.payload.user
        state.admin = action.payload.admin
      })
      .addCase(authorizate.rejected, (state, action) => {
        state.error = action.payload;
        state.signingIn = false;
      })
      .addCase(authorizate.pending, (state, action) => {
        state.error = null;
        state.signingIn = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state, action)=>{
        state.token = null
        state.name = null
        state.user = null
        state.admin = null
      })
      .addCase(delUser.fulfilled, (state, action)=>{
        state.users = state.users.filter((i)=>i._id !== action.payload)
      })
      .addCase(delUser.rejected, (state, action)=>{
        state.error = action.payload
      })

  },
});
export default authSlice.reducer;
