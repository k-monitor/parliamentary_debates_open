import config from '../../config.json';
import {navigate} from 'redux-url';
import buildUrl from 'build-url';

export const SEARCH_TERM = 'search/SEARCH_TERM';
export const UPDATE_SEARCH_TERM = 'search/UPDATE_SEARCH_TERM';
export const SEARCH_SUCCESS = 'search/SEARCH_SUCCESS';
export const OPEN_MODAL = 'search/OPEN_MODAL';
export const CLOSE_MODAL = 'search/CLOSE_MODAL';
export const CHANGE_SPEAKER_FILTER = 'search/CHANGE_SPEAKER_FILTER';
export const CHANGE_TOPIC_FILTER = 'search/CHANGE_TOPIC_FILTER';

const initialState = {
  loading: true,
  search_term: '',
  term: '',
  results: {
    aggregations: {
      speakers: {buckets: []},
      terms: {buckets: []},
    },
    hits: {
      total: 0,
      hits: [],
    },
  },
  speakers: {},
  terms: {},
  speaker_filter: '',
  date_filter: '',
  page: 0,
  topics: {},
  hitOpen: null,
};

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
        loading: true,
        hitOpen: null,
      };

    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        search_term: action.search_term,
      };

    case SEARCH_SUCCESS:
      return {
        ...state,
        hitOpen: null,
        results: action.results,
        page: action.page,
        loading: false,
        speakers: {
          ...action.results.aggregations.speakers.buckets,
        },
        terms: {
          ...action.results.aggregations.terms.buckets,
        },
      };

    case CLOSE_MODAL: {
      return {
        ...state,
        hitOpen: null,
      };
    }

    case OPEN_MODAL: {
      return {
        ...state,
        hitOpen: action.hitOpen,
      };
    }

    default:
      return state;
  }
};

export const navigate_to_search = (search, n) => {
  let search_ = Object.assign({}, search);
  delete search_.loading;
  delete search_.results;
  delete search_.terms;
  delete search_.speakers;
  delete search_.topics;
  delete search_.date_filter;
  if (search_.start_date === null) delete search_.start_date;
  if (search_.end_date === null) delete search_.end_date;
  if (!search_.term) search_.term = '';
  return dispatch => {
    dispatch(
      navigate(
        buildUrl('/parliamentary_debates_open/', {
          path: '',
          queryParams: {
            ...search_,
            page: n,
          },
        }),
      ),
    );
  };
};

export const update_search = search => {
  return dispatch => {
    const page = search.page || 0;
    dispatch({
      type: SEARCH_TERM,
      search,
    });

    const start = page * config.page_size;

    const url = `${config.SEARCH_API}`;

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        id: 'filtered_query_v2',
        params: {
          q: search.term,
          size: config.page_size,
          from: start,
          ...(search.speaker_filter
            ? {'filter.speaker': search.speaker_filter}
            : {}),
          ...(search.date_filter ? {'filter.date': search.date_filter} : {}),
          ...(search.start_date
            ? {'filter.date.from': search.start_date}
            : {'filter.date.from': '1900.01.01.'}),
          ...(search.end_date
            ? {'filter.date.to': search.end_date}
            : {'filter.date.to': '2500.01.01.'}),
        },
      }),
      headers: {'content-type': 'application/json'},
    })
      .then(response => response.json())
      .then(results => dispatch({type: SEARCH_SUCCESS, page, results}));
  };
};

export const open_modal = hitOpen => dispatch => {
  dispatch({
    type: OPEN_MODAL,
    hitOpen,
  });
};

export const close_modal = () => dispatch => {
  dispatch({
    type: CLOSE_MODAL,
  });
};

export const update_search_term = search_term => dispatch => {
  dispatch({
    type: UPDATE_SEARCH_TERM,
    search_term,
  });
};
