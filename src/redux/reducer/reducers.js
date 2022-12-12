import { combineReducers } from "redux";
import branchesReducer from "../branchesSlice";
import groupsReducer from "../groupsSlice";
import loginReducer from "../loginSlice";
import studentsReducer from "../studentsSlice";
import teachersReducer from "../teachersSlice";
import employeesReducer from "../employeesSlice";
import coursesReducer from "../coursesSlice";
import roomsReducer from "../roomsSlice";
import { attendancesReducer } from "../attendancesSlice";
import paymentsReducer from "../paymentsSlice";
import expensesReducer from "../expensesSlice";

export const reducers = combineReducers({
  login: loginReducer,
  groups: groupsReducer,
  students: studentsReducer,
  teachers: teachersReducer,
  branches: branchesReducer,
  employees: employeesReducer,
  courses: coursesReducer,
  rooms: roomsReducer,
  attendances: attendancesReducer,
  payments: paymentsReducer,
  expenses: expensesReducer,
});
