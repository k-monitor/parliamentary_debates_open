import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import store, { history } from './store'
import { ConnectedRouter } from 'react-router-redux'


it('renders correctly', () => {
  const tree = renderer
    .create(<Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
})
