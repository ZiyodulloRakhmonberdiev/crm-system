import { combineReducers } from 'redux'
import branchesReducer from '../branchesSlice'
import groupsReducer from '../groupsSlice'
import loginReducer from '../loginSlice'
import studentsReducer from '../studentsSlice'
import teachersReducer from '../teachersSlice'
import employeesReducer from '../employeesSlice'
import coursesReducer from '../coursesSlice'
import roomsReducer from '../roomsSlice'

export const reducers = combineReducers({
  login: loginReducer,
  groups: groupsReducer,
  students: studentsReducer,
  teachers: teachersReducer,
  branches: branchesReducer,
  employees: employeesReducer,
  courses: coursesReducer,
  rooms: roomsReducer
})
