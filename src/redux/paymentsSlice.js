import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  paymentsAmount: "",
  profitAmount: "",
  debtsAmount: "",
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
    fetchingDebts: (state) => {
      state.loading = true;
    },
    fetchedPayments: (state, action) => {
      state.loading = false;
      state.payments = action.payload;
    },
    fetchedDebts: (state, action) => {
      state.loading = false;
      state.debtsAmount = action.payload;
    },
    fetchingPaymentsAmount: (state) => {
      state.loading = true;
    },
    fetchedPaymentsAmount: (state, action) => {
      state.loading = false;
      state.paymentsAmount = action.payload;
    },
    fetchedProfitAmount: (state, action) => {
      // state.loading = false;
      state.profitAmount = action.payload;
    },
    fetchedError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchingPayments,
  fetchingDebts,
  fetchedPayments,
  fetchedDebts,
  fetchingPaymentsAmount,
  fetchedPaymentsAmount,
  fetchedProfitAmount,
  fetchedError,
} = paymentsSlice.actions;
const paymentsReducer = paymentsSlice.reducer;
export default paymentsReducer;
