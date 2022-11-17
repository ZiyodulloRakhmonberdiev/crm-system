import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  students: [],
  loading: false,
  error: false,
  refreshStudents: true,
  userData: {},
  userGroupData: {},
  studentGroups: []
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
    },
    fetchingStudentGroups: (state, action) => {
      state.studentGroups = action.payload
    },
    refreshStudentsData: state => {
      state.refreshStudents = !state.refreshStudents
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    setUserGroupData: (state, action) => {
      state.userGroupData = action.payload
    }
  }
})

export const {
  fetchingStudents,
  fetchingStudentGroups,
  fetchedStudents,
  fetchedError,
  refreshStudentsData,
  setUserData,
  setUserGroupData
} = studentsSlice.actions
const studentsReducer = studentsSlice.reducer
export default studentsReducer
