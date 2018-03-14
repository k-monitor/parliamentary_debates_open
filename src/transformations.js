import _ from 'lodash'

export const extract_speakers_from_hits = hits =>
  _.uniqWith(hits.map(hit => hit._source.speaker), _.isEqual)
