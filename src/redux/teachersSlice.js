import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  teachers: [],
  loading: false,
  error: false,
  refreshTeachers: true,
  teachersData: {}
}

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    fetchingTeachers: state => {
      state.loading = true
    },
    fetchedTeachers: (state, action) => {
      state.loading = false
      state.teachers = action.payload
    },
    fetchedError: state => {
      state.loading = false
      state.error = true
    },
    refreshTeachersData: state => {
      state.refreshTeachers = !state.refreshTeachers
    },
    setTeachersData: (state, action) => {
      state.teachersData = action.payload
    }
  }
})

export const {
  fetchingTeachers,
  fetchedTeachers,
  fetchedError,
  refreshTeachersData,
  setTeachersData
} = teachersSlice.actions
const teachersReducer = teachersSlice.reducer
export default teachersReducer
