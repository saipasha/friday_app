import { login } from "../../firebase";
import axios from 'axios'

let url = "https://rickandmortyapi.com/api/character"

//1.- Constants
export const TYPING_CREDENTIALS = "TYPING_CREDENTIALS";
export const SET_USER_DATA_SUCCESS = "SET_USER_DATA_SUCCESS";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA"
export const REMOVE_USER_DATA = "REMOVE_USER_DATA"
// export const GET_USER_DATA = "GET_USER_DATA"

// Mortys
export const FETCH_USERS_LIST = "FETCH_USERS_LIST"
export const FETCH_USERS_LIST_SUCCESS = "FETCH_USERS_LIST_SUCCESS"
export const FETCH_USERS_LIST_ERROR = "FETCH_USERS_LIST_ERROR"

//2.-Action creators

// Mortys

function fetchUsersListSuccess(users){
  return {
    type: FETCH_USERS_LIST_SUCCESS,
    payload: users
  }
}

function fetchUsersListError(e){
  return {
    type: FETCH_USERS_LIST_ERROR,
    payload: e
  }
}

//

function removeUserDataSuccess(payload){
  return {
    type: REMOVE_USER_DATA,
    payload
  }
}

function updateUserDataSuccess(data){
  return {
    type: UPDATE_USER_DATA,
    payload: data,
  }
}

function typingCredentialsSuccess(credentials) {
  //esto devuelve un action
  return {
    type: TYPING_CREDENTIALS,
    credentials
  };
}

function setUserDataSuccess(user) {
  return {
    type: SET_USER_DATA_SUCCESS,
    user
  };
}


//3.- Thunks == thunks are created to wait for the server's response and then dispatches to the reducer.

// Mortys

export let fetchUsersList = () => (dispatch, getState) => {
  let state = getState()
  if (state.users.array.length > 1) return // This is to stop consuming if you already have the info.
  axios.get(url)
    .then(res=>{
      dispatch(fetchUsersListSuccess(res.data.results))
    })
    .catch(e=>{
      console.log(e)
      // dispatch(fetchUsersListError())
    })
}

//

export let removeUserData = () => (dispatch) => {
  // hardcoding the keys of the current user. I have to change them here.
  let current = {
    name: "",
    email: "",
    bio: ""
  }
  return dispatch(removeUserDataSuccess(current))
}

export let updateUserData = (data) => (dispatch) => {
  return dispatch(updateUserDataSuccess(data))
}

export let typingCredentials = credentials => dispatch => {
  //supongamos que aqui consumimos una api y todo sale bien
  return dispatch(typingCredentialsSuccess(credentials));
};

export let setUserData = (email, password) => dispatch => {
  return login(email, password).then(user => dispatch(setUserDataSuccess(user)));
};
