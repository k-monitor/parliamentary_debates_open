import { extract_speakers_from_hits } from './transformations'

it('returns empty list for empty input', () => {
  expect(extract_speakers_from_hits([])).toEqual([])
})

it('returns single speaker for single speaker input', () => {
  expect(extract_speakers_from_hits([{'_source': {'speaker': 'foo'}}])).toEqual(['foo'])
})

it('returns both speakers', () => {
  expect(extract_speakers_from_hits([{'_source': {'speaker': 'foo'}}, {'_source': {'speaker': 'bar'}}]))
    .toEqual(['foo', 'bar'])
})

it('does not return duplicates', () => {
  expect(extract_speakers_from_hits([{'_source': {'speaker': 'foo'}}, {'_source': {'speaker': 'foo'}}]))
    .toEqual(['foo'])
})

