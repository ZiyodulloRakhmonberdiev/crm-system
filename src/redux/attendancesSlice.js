import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendances: {},
  loading: false,
  error: false
}

const attendancesSlice = createSlice({
  name: "attendances",
  initialState,
  reducers: {
    fetchingAtt: (state) => {
      state.loading = true
    },
    fetchedAtt: (state, action) => {
      state.error = false
      state.loading = false
      state.attendances = action.payload
    },
    fetchingErrorAtt: (state, action) => {
      state.loading = false
      state.error = true
    }
  }
})


export const {
  fetchingAtt,
  fetchedAtt,
  fetchingErrorAtt
} = attendancesSlice.actions
export const attendancesReducer = attendancesSlice.reducer