import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  signingUp: false,
  signingIn: false,
  error: null,
  token: localStorage.getItem("token"),
};

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
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    logOut(state, action) {
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.authorization = action.payload;
        state.signingUp = false;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = "Данное имя пользователя уже существует";
        state.signingUp = false;
      })
      .addCase(createUser.pending, (state, action) => {
        state.error = null;
        state.signingUp = true;
      })
      .addCase(authorizate.fulfilled, (state, action) => {
        state.authorization = action.payload;
        state.signingIn = false;
        state.error = null;
        state.token = action.payload.token;
      })
      .addCase(authorizate.rejected, (state, action) => {
        state.error = action.payload;
        state.signingIn = false;
      })
      .addCase(authorizate.pending, (state, action) => {
        state.error = null;
        state.signingIn = true;
      });
  },
});
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
