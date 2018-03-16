import _ from 'lodash'

export const extract_speakers_from_hits = hits =>
  hits ?
    _.uniqWith(hits.map(hit => hit._source.speaker), _.isEqual) : []

export const crossfilter = filters => items => items
  .filter(item => filters.speakers[item._source.speaker])
