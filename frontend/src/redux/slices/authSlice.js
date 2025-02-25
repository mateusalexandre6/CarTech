import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, thunkAPI) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.accessToken); 
    localStorage.setItem("user", JSON.stringify(response.data.user));

    loginSuccess(response.data);
  
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});


export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  return null; 
});

export const restoreUser = createAsyncThunk("auth/restoreUser", async (_, thunkAPI) => {
  const token = localStorage.getItem("token");
  if (!token) return thunkAPI.rejectWithValue("No token found");

  try {

    const response = await api.post("/auth/refresh", {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } 
  catch (error) {
    localStorage.removeItem("token"); 
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
   name: "auth",
  initialState: {
    user: localStorage.getItem("user") || null,
    accessToken: localStorage.getItem("token") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    status: "idle",
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      console.log(action.payload);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
    refreshSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("token", action.payload.accessToken);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreUser.fulfilled, (state, action) => {
      
        state.user = action.payload.user;
        state.status = "authenticated";
      })
      .addCase(restoreUser.rejected, (state) => {
        state.user = null;
        state.status = "idle";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "authenticated";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { loginSuccess, logout, refreshSuccess } = authSlice.actions;
export default authSlice.reducer;