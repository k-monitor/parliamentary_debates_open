import config from '../../config.json'

export const SEARCH_TERM = 'seach/SEARCH_TERM'
export const SEARCH_SUCCESS = 'seach/SEARCH_SUCCESS'

const initialState = {
  term: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TERM:
      return {
        ...state,
        term: action.term
      }

    case SEARCH_SUCCESS:
      return {
        ...state,
        results: action.results
      }

    default:
      return state
  }
}

export const search = (term) => {
  return dispatch => {
    dispatch({
      type: SEARCH_TERM, term
    })

    return fetch(`${config.SEARCH_API}?q=${term}`)
      .then(response => response.json())
      .then(results => dispatch({ type: SEARCH_SUCCESS, results }))
  }
}
