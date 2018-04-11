import _ from 'lodash'

export const buckets_to_map = buckets =>
  buckets.length ? 
    Object.assign(
      {},
      {[buckets[0].key]: buckets[0].doc_count},
      buckets_to_map(buckets.slice(1))
    )
  : {}
