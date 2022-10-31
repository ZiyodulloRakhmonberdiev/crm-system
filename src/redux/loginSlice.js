import axios from '../axios/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null
}

export const checkUserIdLoggedIn = createAsyncThunk(
  "checkUserLoggedIn",
  async () => {
    const {data} = await axios.get("/api/schedule")
    return data
  }
)

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user 
    },
    logout: (state) => {
      state.token = null
      state.user = null
    }
  },
  extraReducers: {
    [checkUserIdLoggedIn.pending]: (data) => {
      console.log("loading")
    },
    [checkUserIdLoggedIn.fulfilled]: (data) => {
      console.log("data")
    },
    [checkUserIdLoggedIn.rejected]: (data) => {
      console.log("error")
    },
  }
})

export const { login, logout } = loginSlice.actions
const loginReducer = loginSlice.reducer
export default loginReducer
