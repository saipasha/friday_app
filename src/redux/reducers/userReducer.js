import { combineReducers } from "redux";

import {
  TYPING_CREDENTIALS,
  SET_USER_DATA_SUCCESS,
  FETCH_USERS_LIST_SUCCESS,
  FETCH_USERS_LIST_ERROR,
} from "../actions/userActions";
import { start } from "pretty-error";

function current(state={}, action){
  switch(action.type) {
    case "UPDATE_USER_DATA":
      return action.payload // The most used thing in redux to indicate data carriers.
    case "REMOVE_USER_DATA":
      return action.payload
    case "GET_USER_DATA":
    case "MERGE_USER_DATA": // This would work in case you have the option of merging multiple accounts that signed up with different methods.
    default:
      return state
  }
}

function data(state = {}, action) {
  switch (action.type) {
    case TYPING_CREDENTIALS:
      return action.credentials;
    case SET_USER_DATA_SUCCESS:
      return action.user;
    default:
      return state;
  }
}

function array(state = [], action) {
  switch (action.type) {
    case "ADD_USER":
      return [state, action.user];
    case FETCH_USERS_LIST_SUCCESS:
      return action.payload
    case FETCH_USERS_LIST_ERROR:
      return state
    default:
      return state;
  }
}

function object(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({ array, object, data, current });
