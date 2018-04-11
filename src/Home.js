import React from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';
import {update_search, update_speaker} from './store/modules/search'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Results from './Results.js'
import Speakers from './Speakers.js'
import Topics from './Topics.js'
import { buckets_to_map } from './transformations'
import {DelayInput} from 'react-delay-input';

const Home = props => (
  <Row>
    <Col sm={3}>
      <h2>Search</h2>
      <h3>Keyword</h3>
      <DelayInput minLength={3} delayTimeout={300} element={FormControl} onChange={event => props.update_search(event.target.value)} />
      <h3>Speakers</h3>
      <Speakers counts={buckets_to_map(props.search.results.aggregations.speakers.buckets)}
        speakers={props.search.speakers} onChange={props.update_speaker} />
    </Col>
    <Col sm={9}>
      <Results results={props.search.results} page={props.search.page}
        navigate_to_page={n => props.update_search(props.search.term, n)} />
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
