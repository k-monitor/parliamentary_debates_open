import get_pages from './pagination'

describe('get_pages()', () => {
  const tests = [
    [50, 0, []],
    [50, 1, [0]],
    [50, 50, [0]],
    [50, 51, [0, 1]],
    [1, 3, [0, 1, 2]],
    [2, 5, [0, 1, 2]],
    [2, 6, [0, 1, 2]],
    [2, 7, [0, 1, 2, 3]],
  ]

  tests.forEach(([page_size, result_count, expectation]) => (
    it(`get_pages(${page_size}, ${result_count}) -> ${expectation}`, () => {
      expect(get_pages(page_size, result_count)).toEqual(expectation)
    })
  ))
})
