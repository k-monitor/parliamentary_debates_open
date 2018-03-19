import { extract_speakers_from_hits } from './transformations'
import { extract_topics_from_hits } from './transformations'
import { crossfilter } from './transformations'
import { counts } from './transformations'

describe('crossfilter', () => {
  it('returns empty list for empty input', () => {
    expect(crossfilter({})([])).toEqual([])
  })

  it('every speaker is shown', () => {
    expect(crossfilter({
      'speakers': {
        'foo': true,
        'bar': true
      }
    })([
      {'_source': {'speaker': 'foo', 'text': 'asd'}},
      {'_source': {'speaker': 'foo', 'text': 'asd2'}},
      {'_source': {'speaker': 'bar', 'text': 'asd2'}},
    ])).toEqual([
      {'_source': {'speaker': 'foo', 'text': 'asd'}},
      {'_source': {'speaker': 'foo', 'text': 'asd2'}},
      {'_source': {'speaker': 'bar', 'text': 'asd2'}},
    ])
  })

  it('speaker filter undefined', () => {
    expect(crossfilter({
    })([
      {'_source': {'speaker': 'foo', 'text': 'asd'}},
      {'_source': {'speaker': 'foo', 'text': 'asd2'}},
      {'_source': {'speaker': 'bar', 'text': 'asd2'}},
    ])).toEqual([
      {'_source': {'speaker': 'foo', 'text': 'asd'}},
      {'_source': {'speaker': 'foo', 'text': 'asd2'}},
      {'_source': {'speaker': 'bar', 'text': 'asd2'}},
    ])
  })

  it('not every speaker is shown', () => {
    expect(crossfilter({
      'speakers': {
        'foo': false,
        'bar': true
      }
    })([
      {'_source': {'speaker': 'foo', 'text': 'asd'}},
      {'_source': {'speaker': 'foo', 'text': 'asd2'}},
      {'_source': {'speaker': 'bar', 'text': 'asd2'}},
    ])).toEqual([
      {'_source': {'speaker': 'bar', 'text': 'asd2'}},
    ])
  })

  it('not every topic is shown', () => {
    expect(crossfilter({
      'topics': {
        'foo': true,
        'bar': false
      }
    })([
      {'_source': {'topic': 'foo', 'text': 'asd'}},
      {'_source': {'topic': 'foo', 'text': 'asd2'}},
      {'_source': {'topic': 'bar', 'text': 'asd2'}},
    ])).toEqual([
      {'_source': {'topic': 'foo', 'text': 'asd'}},
      {'_source': {'topic': 'foo', 'text': 'asd2'}},
    ])
  })
})

describe('extract_speakers_from_hits', () => {
  it('returns empty list for empty input', () => {
    expect(extract_speakers_from_hits([])).toEqual([])
  })

  it('returns empty list for undefined', () => {
    expect(extract_speakers_from_hits(undefined)).toEqual([])
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
})

describe('extract_topics_from_hits', () => {
  it('returns empty list for empty input', () => {
    expect(extract_topics_from_hits([])).toEqual([])
  })

  it('returns empty list for undefined', () => {
    expect(extract_topics_from_hits(undefined)).toEqual([])
  })

  it('returns single speaker for single speaker input', () => {
    expect(extract_topics_from_hits([{'_source': {'topic': 'foo'}}])).toEqual(['foo'])
  })

  it('returns both topics', () => {
    expect(extract_topics_from_hits([{'_source': {'topic': 'foo'}}, {'_source': {'topic': 'bar'}}]))
      .toEqual(['foo', 'bar'])
  })

  it('does not return duplicates', () => {
    expect(extract_topics_from_hits([{'_source': {'topic': 'foo'}}, {'_source': {'topic': 'foo'}}]))
      .toEqual(['foo'])
  })
})

describe('counts', () => {
  it('returns empty object for empty input', () => {
    expect(counts([], () => 4)).toEqual({})
  })

  it('count objects in a single category', () => {
    expect(counts(['foo', 'bar'], () => 4)).toEqual({4: 2})
  })

  it('count objects in a multiple categories', () => {
    expect(counts(['foo', 'bar'], x => x)).toEqual({
      'foo': 1, 'bar': 1
    })
  })
})
