import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  paymentsAmount: "",
  loading: false,
  error: false,
};

const paymentsSlice = createSlice({
  name: "finances",
  initialState,
  reducers: {
    fetchingPayments: (state) => {
      state.loading = true;
    },
    fetchedPayments: (state, action) => {
      state.loading = false;
      state.payments = action.payload;
    },
    fetchingPaymentsAmount: (state) => {
      state.loading = true;
    },
    fetchedPaymentsAmount: (state, action) => {
      state.loading = false;
      state.paymentsAmount = action.payload;
    },
    fetchedError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchingPayments,
  fetchedPayments,
  fetchingPaymentsAmount,
  fetchedPaymentsAmount,
  fetchedError,
} = paymentsSlice.actions;
const paymentsReducer = paymentsSlice.reducer;
export default paymentsReducer;
