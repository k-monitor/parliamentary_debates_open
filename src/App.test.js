import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from './store';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <div>
          <App />
        </div>
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
