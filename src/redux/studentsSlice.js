import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  studentsDebtors: [],
  studentsStatistics: [],
  loading: false,
  loadingJoinedGroups: false,
  loadingPayments: false,
  error: false,
  refreshStudents: true,
  userData: {},
  userGroupData: {},
  studentJoinedGroups: [],
  studentPayments: [],
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    fetchingStudents: (state) => {
      state.loading = true;
    },
    fetchingStudentsDebtors: (state) => {
      state.loading = true;
    },
    fetchingStudentsStatistics: (state) => {
      state.loading = true;
    },
    fetchedStudents: (state, action) => {
      state.loading = false;
      state.students = action.payload;
    },
    fetchedStudentsDebtors: (state, action) => {
      state.loading = false;
      state.studentsDebtors = action.payload;
    },
    fetchedStudentsStatistics: (state, action) => {
      state.loading = false;
      state.studentsStatistics = action.payload;
    },
    fetchedError: (state) => {
      state.loading = false;
      state.error = true;
    },
    fetchingStudentJoinedGroups: (state) => {
      state.loadingJoinedGroups = true;
    },
    fetchedStudentJoinedGroups: (state, action) => {
      state.loadingJoinedGroups = false;
      state.studentJoinedGroups = action.payload;
    },
    fetchingStudentPayments: (state) => {
      state.loadingPayments = true;
    },
    fetchedStudentPayments: (state, action) => {
      state.loadingPayments = false;
      state.studentPayments = action.payload;
    },
    refreshStudentsData: (state) => {
      state.refreshStudents = !state.refreshStudents;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserGroupData: (state, action) => {
      state.userGroupData = action.payload;
    },
    changeUpdateUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
  },
});

export const {
  fetchingStudents,
  fetchingStudentsDebtors,
  fetchingStudentJoinedGroups,
  fetchedStudentJoinedGroups,
  fetchingStudentPayments,
  fetchedStudentPayments,
  fetchedStudents,
  fetchedStudentsDebtors,
  fetchedError,
  refreshStudentsData,
  setUserData,
  setUserGroupData,
  changeUpdateUserData,
  fetchingStudentsStatistics,
  fetchedStudentsStatistics,
} = studentsSlice.actions;
const studentsReducer = studentsSlice.reducer;
export default studentsReducer;
