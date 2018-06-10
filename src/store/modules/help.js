export const TOGGLE = 'help/TOGGLE'

const initialState = {
  show: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        show: !state.show
      }
    default:
      return state
  }
}

export const toggle = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE
    })
  }
}
