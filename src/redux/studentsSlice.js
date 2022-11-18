import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  students: [],
  loading: false,
  loadingJoinedGroups: false,
  error: false,
  refreshStudents: true,
  userData: {},
  userGroupData: {},
  studentJoinedGroups: []
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
    fetchingStudentJoinedGroups: (state, action) => {
      state.loadingJoinedGroups = true
    },
    fetchedStudentJoinedGroups: (state, action) => {
      state.loadingJoinedGroups = false
      state.studentJoinedGroups = action.payload
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
  fetchingStudentJoinedGroups,
  fetchedStudentJoinedGroups,
  fetchedStudents,
  fetchedError,
  refreshStudentsData,
  setUserData,
  setUserGroupData
} = studentsSlice.actions
const studentsReducer = studentsSlice.reducer
export default studentsReducer
