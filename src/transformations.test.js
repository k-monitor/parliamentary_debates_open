import { buckets_to_map } from './transformations'

describe('buckets_to_map', () => {
  const tests = [
    ['empty input', [], {}],
    ['one bucket (1)', [{key: 'a', doc_count: 3}], {'a': 3}],
    ['one bucket (2)', [{key: 'a', doc_count: 0}], {'a': 0}],
    ['one bucket (3)', [{key: 'b', doc_count: 0}], {'b': 0}],
    [
      'multiple buckets',
      [{key: 'b', doc_count: 9}, {key: 'a', doc_count: 10}],
      {'b': 9, 'a': 10}
    ],
  ]

  tests.forEach(([desc, buckets, expected_map]) => {
    it(desc, () => {
      expect(buckets_to_map(buckets)).toEqual(expected_map)
    })
  })
})
