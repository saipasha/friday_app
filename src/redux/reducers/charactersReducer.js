import { combineReducers } from "redux"

import {
  GET_CHARACTERS_BEGIN,
  GET_CHARACTERS_SUCCESS,
  GET_CHARACTERS_ERROR,
} from "../actions/charsActions"

function chars(state={}, action){
  switch(action.type) {
    case GET_CHARACTERS_SUCCESS:
      action.payload.chars.map(c=>state[c.id] = c)
      return {...state}
    default:
      return state
  }
}

function error(state=false, action){
  switch(action.type) {
    case GET_CHARACTERS_SUCCESS:
      return false
    case GET_CHARACTERS_ERROR:
      return true
    default:
      return state
  }
}

function fetching(state=false, action){
  switch(action.type) {
    case GET_CHARACTERS_SUCCESS:
      return false
    case GET_CHARACTERS_BEGIN:
      return true
    default:
      return state
  }
}

function fetched(state=0, action){
  switch(action.type) {
    case GET_CHARACTERS_SUCCESS:
      return action.payload.fetched
    default:
      return state
  }
}

function prev(state="", action){
  switch(action.type) {
    case GET_CHARACTERS_SUCCESS:
      return action.payload.prev
    default:
      return state
  }
}

function next(state="https://rickandmortyapi.com/api/character/", action){
  switch(action.type) {
    case GET_CHARACTERS_SUCCESS:
      return action.payload.next
    default:
      return state
  }
}

function count(state=0, action){
  switch(action.type) {
    case GET_CHARACTERS_SUCCESS:
      return action.payload.count
    default:
      return state
  }
}

function currentPage(state=0, action){
  switch(action.type) {
    case GET_CHARACTERS_SUCCESS:
      return action.payload.currentPage
    default:
      return state
  }
}

export default combineReducers({ chars, error, fetching, fetched, prev, next, count, currentPage });