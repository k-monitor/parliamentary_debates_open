import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './Filter';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import store, { history } from './store'
import { ConnectedRouter } from 'react-router-redux'


it('renders correctly', () => {
  const tree = renderer
    .create(<Filter
        speakers={{"John Doe": true, "Random Name": false}}
        counts={{"John Doe": 1, "Random Name": 2}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
})
