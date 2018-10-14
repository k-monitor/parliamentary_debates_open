import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './Filter';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import store, { history } from './store'


it('renders correctly', () => {
  const tree = renderer
    .create(<Filter
        counts={[
          {'key': 'John Doe', 'doc_count': '3'},
          {'key': 'asdfg', 'doc_count': '1'},
          {'key': 'sdgsdf', 'doc_count': '1'},
        ]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
})
