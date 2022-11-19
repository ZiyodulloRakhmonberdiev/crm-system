import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allPayments: [],
  allPaymentsAmount: "",
  loading: false,
  error: false,
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
    fetchingAllPaymentsAmount: state => {
      state.loading = true
    },
    fetchedAllPaymentsAmount: (state, action) => {
      state.loading = false
      state.allPaymentsAmount = action.payload
    },
    fetchedError: state => {
      state.loading = false
      state.error = true
    },
  }
})

export const {
  fetchingAllPayments,
  fetchedAllPayments,
  fetchingAllPaymentsAmount,
  fetchedAllPaymentsAmount,
  fetchedError,
} = financesSlice.actions
const financesReducer = financesSlice.reducer
export default financesReducer
