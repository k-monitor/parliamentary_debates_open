import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import search from './search';
import help from './help';
import about from './about';

export default combineReducers({
  routing: routerReducer,
  search,
  about,
  help,
});
