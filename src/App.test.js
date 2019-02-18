import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from './store';

jest.mock('recharts', () => ({
  AreaChart: () => 'AreaChart',
  Area: () => 'Area',
  XAxis: () => 'XAxis',
  YAxis: () => 'YAxis',
  Tooltip: () => 'Tooltip',
}));

xit('renders correctly', () => {
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
