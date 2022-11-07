import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  groups: [],
  loading: false,
  error: false,
  refreshGroups: true,
  groupData: {}
}

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    fetchingGroups: state => {
      state.loading = true
    },
    fetchedGroups: (state, action) => {
      state.loading = false
      state.groups = action.payload
    },
    fetchedError: state => {
      state.loading = false
      state.error = true
    },
    refreshGroupsData: state => {
      state.refreshGroups = !state.refreshGroups
    },
    setGroupData: (state, action) => {
      state.groupData = action.payload
    },
    changeUpdateGroupData: (state, action) => {
      state.groupData = { ...state.groupData, ...action.payload }
    }
  }
})

export const {
  fetchingGroups,
  fetchedGroups,
  fetchedError,
  refreshGroupsData,
  setGroupData,
  changeUpdateGroupData
} = groupsSlice.actions
const groupsReducer = groupsSlice.reducer
export default groupsReducer
