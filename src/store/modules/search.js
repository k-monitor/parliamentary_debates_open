import config from '../../config.json'

export const SEARCH_TERM = 'search/SEARCH_TERM'
export const SEARCH_SUCCESS = 'search/SEARCH_SUCCESS'
export const CHANGE_SPEAKER_FILTER = 'search/CHANGE_SPEAKER_FILTER'
export const CHANGE_TOPIC_FILTER = 'search/CHANGE_TOPIC_FILTER'

const initialState = {
  loading: false,
  term: '',
  results: {
    aggregations: {
      speakers: {buckets: []}
    },
    hits: {
      total: 0,
      hits: []
    },
  },
  speakers: {},
  speaker_filter: '',
  page: 0,
  topics: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TERM:
      console.log(action.search.term)
      return {
        ...state,
        term: action.search.term,
        speaker_filter: action.search.speaker_filter,
        loading: true
      }

    case SEARCH_SUCCESS:
      return {
        ...state,
        results: action.results,
        page: action.page,
        loading: false,
        speakers: {
          ...action.results.aggregations.speakers.buckets
        }
      }

    default:
      return state
  }
}

export const update_search = (search, page = 0) => {
  return dispatch => {
    dispatch({
      type: SEARCH_TERM, search
    })

    const start = page * config.page_size

    const url =
      `${config.SEARCH_API}`

    return fetch(
      url, 
      {
        'method': 'POST',
        'body': JSON.stringify({
          "id": "filtered_query_v2",
          "params": {
            'q': search.term,
            'size': config.page_size,
            'from': start,
            ...(
              search.speaker_filter
                ? {'filter.speaker': search.speaker_filter}
                : {}
            )
          }
        }),
        "headers": {"content-type": "application/json"}
      }
    )
      .then(response => response.json())
      .then(results => dispatch({ type: SEARCH_SUCCESS, page, results }))
  }
}
