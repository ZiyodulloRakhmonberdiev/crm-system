import { combineReducers } from "redux";
import groupsReducer from "../groupsSlice";
import loginReducer from "../loginSlice";

export const reducers = combineReducers({
  login: loginReducer,
  groups: groupsReducer
})