import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employees: [],
  loading: false,
  error: false,
  refreshEmployees: true,
  employeesData: {}
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    fetchingEmployees: state => {
      state.loading = true
    },
    fetchedEmployees: (state, action) => {
      state.loading = false
      state.employees = action.payload
    },
    fetchedError: state => {
      state.loading = false
      state.error = true
    },
    refreshEmployeesData: state => {
      state.refreshEmployees = !state.refreshEmployees
    },
    setEmployeesData: (state, action) => {
      state.employeesData = action.payload
    }
  }
})

export const {
  fetchingEmployees,
  fetchedEmployees,
  fetchedError,
  refreshEmployeesData,
  setEmployeesData
} = employeesSlice.actions
const employeesReducer = employeesSlice.reducer
export default employeesReducer
