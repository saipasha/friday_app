import axios from 'axios'

// Constants

export let GET_CHARACTERS_BEGIN = "GET_CHARACTERS_BEGIN"
export let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
export let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"
export let CHARACTERS_LIMIT_REACHED = "CHARACTERS_LIMIT_REACHED"
export let GET_SPECIFIC_PAGE_SUCCESS = "GET_SPECIFIC_PAGE_SUCCESS"
export let CHANGE_CURRENT_PAGE = "CHANGE_CURRENT_PAGE"

// Action Creator

function changeCurrentPage(payload) {
  return {
    type: CHANGE_CURRENT_PAGE,
    payload
  }
}

function getCharactersBegin() {
  return {
    type: GET_CHARACTERS_BEGIN
  }
}

function getCharactersSuccess(payload) {
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

function charactersLimitReached () {
  return {
    type: CHARACTERS_LIMIT_REACHED
  }
}

// Thunks

export const getSpecificPage = (pageNumber) => (dispatch, getState) => {
  let { next, pages } = getState().characters
  // If I have page …
  if(pages[`page${pageNumber}`]) return dispatch(changeCurrentPage(pageNumber))
  // If I don't have page …
  let alreadyHere = Object.keys(getState().characters.chars).length
  // next = [ ...next.slice(0, next.length - 1 ), pageNumber ].join('')
  // To replace the number at the end of the string
  next = next.split("=")[0] + "=" + pageNumber 
  dispatch(getCharactersBegin())
  return axios.get(next)
    .then(res=>{
      let payload = {
        pages: res.data.info.pages,
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
      // Send message and store it in store
      dispatch(getCharactersError()) 
    })
}
 
export let onGetCharacters = () => (dispatch, getState) => {
  let { count, fetched } = getState().characters
  if (count === fetched) return dispatch(charactersLimitReached()) // No more characters
  // When count == fetched: Dispatch stop fetching 
  let next = getState().characters.next
  // Missing validations such as if all the elements have been loaded or if I asked already for that page.
  let alreadyHere = Object.keys(getState().characters.chars).length
  dispatch(getCharactersBegin())
  return axios.get(next)
    .then(res=>{
      let payload = {
        pages: res.data.info.pages,
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