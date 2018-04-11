import React from 'react';
import ReactDOM from 'react-dom';
import Results from './Results';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import store, { history } from './store'
import { ConnectedRouter } from 'react-router-redux'


it('renders correctly', () => {
  const tree = renderer
    .create(<Results results={{"hits": {"hits": [
            {"highlight": {"text": "a"}, "_source": {"text": "Foo"}, "_id": 3},
            {"highlight": {"text": "b"}, "_source": {"text": "Bar"}, "_id": 2}
        ]}}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
})
