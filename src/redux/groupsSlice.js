import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  loading: false,
  error: false
}

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    fetchingGroups: (state) => {
      state.loading = true
    },
    fetchGroups: (state, action) => {
      state.loading = false
      state.groups = action.payload
    },
    fetchingError: (state) => {
      state.loading = false
      state.error = true
    }
  }
})

export const { fetchGroups, fetchingGroups, fetchingError } = groupsSlice.actions
const groupsReducer = groupsSlice.reducer
export default groupsReducer