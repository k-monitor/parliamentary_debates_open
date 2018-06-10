import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import search from './search'
import help from './help'

export default combineReducers({
  routing: routerReducer,
  search,
  help
})
