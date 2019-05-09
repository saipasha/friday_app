import axios from 'axios'

// Constants

export let GET_CHARACTERS_BEGIN = "GET_CHARACTERS_BEGIN"
export let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
export let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"

// Action Creator

function getCharactersBegin() {
  return {
    type: GET_CHARACTERS_BEGIN
  }
}

function getCharactersSuccess(payload) {
  console.log("perro",payload)
  return {
    type: GET_CHARACTERS_SUCCESS,
    payload
  }
}

function getCharactersError() {
  return {
    type: GET_CHARACTERS_ERROR
  }
}

// Thunks

export let onGetCharacters = () => (dispatch, getState) => {
  // When count == fetched: Dispatch stop fetching 
  let next = getState().characters.next
  // Missing validations such as if all the elements have been loaded or if I asked already for that page.
  let alreadyHere = Object.keys(getState().characters.chars).length
  dispatch(getCharactersBegin())
  return axios.get(next)
    .then(res=>{
      let payload = {
        chars: res.data.results,
        fetched: alreadyHere + res.data.results.length,
        prev: next,
        next: res.data.info.next,
        count: res.data.info.count,
        // currentPage: currentPage > 9 ? next.slice(next.length - 2) : next.charAt(length - 1)
        currentPage: next.split("=")[1] || 1
      }
      dispatch(getCharactersSuccess(payload))
    })
    .catch(e=>{
      dispatch(getCharactersError()) //Deberiamos mandar el mensaje y guardarlo en store
    })
}