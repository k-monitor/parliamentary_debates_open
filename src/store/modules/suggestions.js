import config from '../../config.json';
export const UPDATE_SUGGESTION = 'suggestions/UPDATE_SUGGESTION';
export const LOADING_SUGGESTION = 'suggestions/LOADING_SUGGESTION';

const initialState = {
  suggestions: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SUGGESTION:
      return {
        ...state,
        isLoading: false,
        suggestions: [action.suggestion].concat(
          action.results.suggest.suggest[0].options.map(option => option.text),
        ),
      };

    case LOADING_SUGGESTION:
      return {
        ...state,
        suggestions: [action.suggestion],
        isLoading: true,
      };

    default:
      return state;
  }
};

export const update_suggestions = q => {
  return dispatch => {
    const url = `${config.SEARCH_API}`;
    dispatch({type: LOADING_SUGGESTION, suggestion: q});

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        id: 'suggest_v1',
        params: {q},
      }),
      headers: {'content-type': 'application/json'},
    })
      .then(response => response.json())
      .then(results =>
        dispatch({type: UPDATE_SUGGESTION, results, suggestion: q}),
      );
  };
};
