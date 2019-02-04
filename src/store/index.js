import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './modules';
import {createRouter} from 'redux-url';
import {update_search} from './modules/search';

export const history = createHistory();

const routes = {
  '/parliamentary_debates_open/': (_, query) => update_search(query), // you can also pass a function to transform the action, the matched params, query and the original path will be passed in
  '/parliamentary_debates_open': (_, query) => update_search(query), // you can also pass a function to transform the action, the matched params, query and the original path will be passed in
  '*': 'NOT_FOUND',
};

const initialState = {};
const enhancers = [];
const router = createRouter(routes, createHistory());
const middleware = [router, thunk];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}
const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(rootReducer, initialState, composedEnhancers);

router.sync();

export default store;
