import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  courses: [],
  loading: false,
  error: false,
  refreshCourses: true,
  coursesData: {}
}

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    fetchingCourses: state => {
      state.loading = true
    },
    fetchedCourses: (state, action) => {
      state.loading = false
      state.courses = action.payload
    },
    fetchedError: state => {
      state.loading = false
      state.error = true
    },
    refreshCoursesData: state => {
      state.refreshCourses = !state.refreshCourses
    },
    setCoursesData: (state, action) => {
      state.coursesData = action.payload
    }
  }
})

export const {
  fetchingCourses,
  fetchedCourses,
  fetchedError,
  refreshCoursesData,
  setCoursesData
} = coursesSlice.actions
const coursesReducer = coursesSlice.reducer
export default coursesReducer
