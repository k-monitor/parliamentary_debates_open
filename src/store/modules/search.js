import config from '../../config.json'
import { extract_speakers_from_hits } from '../../transformations'
import { extract_topics_from_hits } from '../../transformations'
import { counts } from '../../transformations'

export const SEARCH_TERM = 'search/SEARCH_TERM'
export const SEARCH_SUCCESS = 'search/SEARCH_SUCCESS'
export const CHANGE_SPEAKER_FILTER = 'search/CHANGE_SPEAKER_FILTER'
export const CHANGE_TOPIC_FILTER = 'search/CHANGE_TOPIC_FILTER'

const initialState = {
  term: '',
  results: {
    hits: {
      hits: []
    }
  },
  speakers: {},
  speaker_counts: {},
  topics: {},
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
        results: action.results,
        speakers: {
          ...Object.assign({},
            ...extract_speakers_from_hits(action.results.hits.hits)
              .map(speaker => ({[speaker]: true}))
          ),
          ...state.speakers
        },
        speaker_counts: counts(
          action.results.hits.hits,
          hit => hit._source.speaker
        ),
        topics: {
          ...Object.assign({},
            ...extract_topics_from_hits(action.results.hits.hits)
              .map(topic => ({[topic]: true}))
          ),
          ...state.topics
        }
      }

    case CHANGE_SPEAKER_FILTER:
      return {
        ...state,
        speakers: {
          ...state.speakers,
          ...{[action.speaker]: action.value}
        }
      }

    case CHANGE_TOPIC_FILTER:
      return {
        ...state,
        topics: {
          ...state.topics,
          ...{[action.topic]: action.value}
        }
      }

    default:
      return state
  }
}

export const update_search = (term) => {
  return dispatch => {
    dispatch({
      type: SEARCH_TERM, term
    })

    return fetch(`${config.SEARCH_API}?q=${term}`)
      .then(response => response.json())
      .then(results => dispatch({ type: SEARCH_SUCCESS, results }))
  }
}

export const update_speaker = ({ speaker, value }) => {
  return dispatch => {
    dispatch({
      type: CHANGE_SPEAKER_FILTER, speaker, value
    })
  }
}

export const update_topic = ({ topic, value }) => {
  return dispatch => {
    dispatch({
      type: CHANGE_TOPIC_FILTER, topic, value
    })
  }
}
