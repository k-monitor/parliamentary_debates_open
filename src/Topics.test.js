import React from 'react';
import ReactDOM from 'react-dom';
import Topics from './Topics';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import store, { history } from './store'
import { ConnectedRouter } from 'react-router-redux'


it('renders correctly', () => {
  const tree = renderer
    .create(<Topics
      topics={{"foo": true, "bar": false}}
      counts={{"foo": 3, "bar": 4}}
      />)
    .toJSON();
  expect(tree).toMatchSnapshot();
})
