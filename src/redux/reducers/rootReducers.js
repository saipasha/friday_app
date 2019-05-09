import { combineReducers } from "redux"
import userReducer from "./userReducer"
import charactersReducer from './charactersReducer'

export default combineReducers({
  users: userReducer,
  characters: charactersReducer
})
