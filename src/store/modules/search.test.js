import { update_search, SEARCH_TERM, SEARCH_SUCCESS } from './search'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import config from '../../config.json'

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

// source: https://medium.com/@ferrannp/unit-testing-with-jest-redux-async-actions-fetch-9054ca28cdcd
const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

it('changes current search term', () => {
  const store = mockStore({'search': {'term': ''}});
  const term = 'John Doe'
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve(mockResponse(200, null, '{"whatever": 42}')));

  return store.dispatch(update_search(term))
    .then(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual({type: SEARCH_TERM, term });
    })
});

const tests = [
  {term: 'John Doe'},
  {term: 'Doe John', page: 3},
]

tests.forEach(({term, page}) => {
  it('calls API and dispatches success action', () => {
    const store = mockStore({'search': {'term': ''}});0
    const from = page ? (page * config.page_size) : 0
    const page_ = page ? page : 0
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, '{"whatever": 42}')));

    return store.dispatch(update_search(term, page))
      .then(() => {
        expect(window.fetch).toBeCalledWith(
          `${config.SEARCH_API}?q=${term}&size=${config.page_size}&from=${from}`)
        const actions = store.getActions();
        expect(actions).toContainEqual({type: SEARCH_SUCCESS, results: {"whatever": 42}, page: page_ });
      })
  })
});

