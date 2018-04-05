import _ from 'lodash'

const get_pages = (page_size, result_count) =>
  _.range(Math.ceil(result_count / page_size))

export default get_pages
