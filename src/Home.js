import React from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';
import {update_search, update_speaker} from './store/modules/search'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Results from './Results.js'
import Speakers from './Speakers.js'
import { crossfilter } from './transformations'

const Home = props => (
  <Row>
    <Col sm={3}>
      <h2>Search</h2>
      <h3>Keyword</h3>
      <FormControl onChange={event => props.update_search(event.target.value)} />
      <h3>Speakers</h3>
      <Speakers speakers={props.search.speakers} onChange={props.update_speaker} />
    </Col>
    <Col sm={9}>
      <Results results={
        crossfilter({
          speakers: props.search.speakers
        })(props.search.results.hits.hits)
      } />
    </Col>
  </Row>
)

const mapStateToProps = state => ({
  search: state.search
})

const mapDispatchToProps = dispatch => bindActionCreators({
  update_search, update_speaker
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
