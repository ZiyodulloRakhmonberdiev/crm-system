import { combineReducers } from 'redux'
import groupsReducer from '../groupsSlice'
import loginReducer from '../loginSlice'
import studentsReducer from '../studentsSlice'
import teachersReducer from '../teachersSlice'

export const reducers = combineReducers({
  login: loginReducer,
  groups: groupsReducer,
  students: studentsReducer,
  teachers: teachersReducer
})
