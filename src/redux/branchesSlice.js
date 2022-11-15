import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  branches: [],
  selected_branch: null,
  loading: false,
  refreshBranches: true,
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
    fetchedError: state => {
      state.loading = false
      state.error = true
    },
    setSelectedBranch: (state, action) => {
      state.selected_branch = action.payload
    },
    refreshBranchesData: state => {
      state.refreshBranches = !state.refreshBranches
    },
  }
})


export const { fetchingBranches,  fetchedBranches, fetchedError, setSelectedBranch, refreshBranchesData, } = branchesSlice.actions
const branchesReducer = branchesSlice.reducer
export default branchesReducer