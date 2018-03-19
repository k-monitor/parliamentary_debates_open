import _ from 'lodash'

export const extract_speakers_from_hits = hits =>
  hits ?
    _.uniqWith(hits.map(hit => hit._source.speaker), _.isEqual) : []

export const extract_categories_from_hits = hits =>
  hits ?
    _.uniqWith(hits.map(hit => hit._source.topic), _.isEqual) : []

export const crossfilter = filters => items => items
  .filter(item => filters.speakers === undefined || filters.speakers[item._source.speaker])
  .filter(item => filters.categories === undefined || filters.categories[item._source.topic])
