import React from 'react';
import ReactDOM from 'react-dom';
import Categories from './Categories';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import store, { history } from './store'
import { ConnectedRouter } from 'react-router-redux'


it('renders correctly', () => {
  const tree = renderer
    .create(<Categories categories={{"foo": true, "bar": false}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
})
