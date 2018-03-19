import React from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';
import {update_search, update_speaker, update_category} from './store/modules/search'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Results from './Results.js'
import Speakers from './Speakers.js'
import Categories from './Categories.js'
import { crossfilter } from './transformations'

const Home = props => (
  <Row>
    <Col sm={3}>
      <h2>Search</h2>
      <h3>Keyword</h3>
      <FormControl onChange={event => props.update_search(event.target.value)} />
      <h3>Speakers</h3>
      <Speakers speakers={props.search.speakers} onChange={props.update_speaker} />
      <h3>Categories</h3>
      <Categories categories={props.search.categories} onChange={props.update_category} />
    </Col>
    <Col sm={9}>
      <Results results={
        crossfilter({
          speakers: props.search.speakers,
          categories: props.search.categories,
        })(props.search.results.hits.hits)
      } />
    </Col>
  </Row>
)

const mapStateToProps = state => ({
  search: state.search
})

const mapDispatchToProps = dispatch => bindActionCreators({
  update_search, update_speaker, update_category
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
