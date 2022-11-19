import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allPayments: [],
  loading: false,
  error: false,
  // refreshAllPayments: true,
  // groupData: {}
}

const financesSlice = createSlice({
  name: 'finances',
  initialState,
  reducers: {
    fetchingAllPayments: state => {
      state.loading = true
    },
    fetchedAllPayments: (state, action) => {
      state.loading = false
      state.allPayments = action.payload
    },
    fetchedError: state => {
      state.loading = false
      state.error = true
    },
    // refreshGroupsData: state => {
    //   state.refreshGroups = !state.refreshGroups
    // },
    // setGroupData: (state, action) => {
    //   state.groupData = action.payload
    // },
    // changeUpdateGroupData: (state, action) => {
    //   state.groupData = { ...state.groupData, ...action.payload }
    // }
  }
})

export const {
  fetchingAllPayments,
  fetchedAllPayments,
  fetchedError,
  // refreshGroupsData,
  // setGroupData,
  // changeUpdateGroupData
} = financesSlice.actions
const financesReducer = financesSlice.reducer
export default financesReducer
