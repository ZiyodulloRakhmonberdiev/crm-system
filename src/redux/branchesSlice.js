import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  branches: [],
  selected_branch: null,
  loading: false
}

const branchesSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    fetchingBranches: (state) => {
      state.loading = true
    },
    fetchedBranches: (state, action) => {
      state.loading = false
      state.branches = action.payload
    },
    setSelectedBranch: (state, action) => {
      state.selected_branch = action.payload
    }
  }
})


export const { fetchingBranches, fetchedBranches, setSelectedBranch } = branchesSlice.actions
const branchesReducer = branchesSlice.reducer
export default branchesReducer