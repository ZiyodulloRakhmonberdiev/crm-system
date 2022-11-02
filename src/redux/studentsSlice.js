import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  students: [],
  loading: false,
  error: false
}

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    fetchingStudents: state => {
      state.loading = true
    },
    fetchedStudents: (state, action) => {
      state.loading = false
      state.students = action.payload
    },
    fetchedError: state => {
      state.loading = false
      state.error = true
    }
  }
})

export const {
  fetchingStudents,
  fetchedStudents,
  fetchedError
} = studentsSlice.actions
const studentsReducer = studentsSlice.reducer
export default studentsReducer
