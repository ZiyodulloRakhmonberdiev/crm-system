import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  expensesAmount: "",
  loading: false,
  error: false,
  refreshExpenses: true,
};

const expensesSlice = createSlice({
  name: "finances",
  initialState,
  reducers: {
    fetchingExpenses: (state) => {
      state.loading = true;
    },
    fetchedExpenses: (state, action) => {
      state.loading = false;
      state.expenses = action.payload;
    },
    fetchingExpensesAmount: (state) => {
      state.loading = true;
    },
    fetchedExpensesAmount: (state, action) => {
      state.loading = false;
      state.expensesAmount = action.payload;
    },
    fetchedError: (state) => {
      state.loading = false;
      state.error = true;
    },
    refreshExpensesData: (state) => {
      state.refreshExpenses = !state.refreshExpenses;
    },
  },
});

export const {
  fetchingExpenses,
  fetchedExpenses,
  fetchingExpensesAmount,
  fetchedExpensesAmount,
  fetchedError,
  refreshExpensesData,
} = expensesSlice.actions;
const expensesReducer = expensesSlice.reducer;
export default expensesReducer;
