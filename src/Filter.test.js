import React from 'react';
import Filter from './Filter';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Filter
        counts={[
          {key: 'John Doe', doc_count: '3'},
          {key: 'asdfg', doc_count: '1'},
          {key: 'sdgsdf', doc_count: '1'},
        ]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
