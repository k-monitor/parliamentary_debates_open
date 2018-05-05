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
  selected_speaker: '',
  page: 0,
  topics: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TERM:
      return {
        ...state,
        term: action.term,
        selected_speaker: '',
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

    case CHANGE_SPEAKER_FILTER:
      return {
        ...state,
        selected_speaker: action.speaker
      }

    default:
      return state
  }
}

export const update_search = (term, page = 0) => {
  return dispatch => {
    dispatch({
      type: SEARCH_TERM, term
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
            'q': term,
            'size': config.page_size,
            'from': start
          }
        }),
        "headers": {"content-type": "application/json"}
      }
    )
      .then(response => response.json())
      .then(results => dispatch({ type: SEARCH_SUCCESS, page, results }))
  }
}

export const update_speaker = ({ speaker }) => {
  return dispatch => {
    dispatch({
      type: CHANGE_SPEAKER_FILTER, speaker
    })
  }
}

