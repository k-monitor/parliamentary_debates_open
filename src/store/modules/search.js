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
      speakers: {buckets: []},
      terms: {buckets: []},
    },
    hits: {
      total: 0,
      hits: []
    },
  },
  speakers: {},
  terms: {},
  speaker_filter: '',
  date_filter: '',
  page: 0,
  topics: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TERM:
      return {
        ...state,
        term: action.search.term,
        speaker_filter: action.search.speaker_filter,
        date_filter: action.search.date_filter,
        start_date: action.search.start_date,
        end_date: action.search.end_date,
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
        },
        terms: {
          ...action.results.aggregations.terms.buckets
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
            ),
            ...(
              search.date_filter
                ? {'filter.date': search.date_filter}
                : {}
            ),
            ...(
              search.start_date
                ? {'filter.date.from': search.start_date}
                : {'filter.date.from': '1900.01.01.'}
            ),
            ...(
              search.end_date
                ? {'filter.date.to': search.end_date}
                : {'filter.date.to': '2500.01.01.'}
            ),
          }
        }),
        "headers": {"content-type": "application/json"}
      }
    )
      .then(response => response.json())
      .then(results => dispatch({ type: SEARCH_SUCCESS, page, results }))
  }
}
