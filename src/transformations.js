import _ from 'lodash'

export const extract_speakers_from_hits = hits =>
  hits ?
    _.uniqWith(hits.map(hit => hit._source.speaker), _.isEqual) : []

export const extract_topics_from_hits = hits =>
  hits ?
    _.uniqWith(hits.map(hit => hit._source.topic), _.isEqual) : []

export const crossfilter = filters => items => items
  .filter(item => filters.speakers === undefined || filters.speakers[item._source.speaker])
  .filter(item => filters.topics === undefined || filters.topics[item._source.topic])
