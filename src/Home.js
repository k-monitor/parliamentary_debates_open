import React from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';
import {update_search} from './store/modules/search'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Results from './Results.js'
import Speakers from './Speakers.js'
import { extract_speakers_from_hits } from './transformations'

const Home = props => (
  <Row>
    <Col sm={3}>
      <h2>Search</h2>
      <FormControl onChange={event => props.update_search(event.target.value)} />
      <Speakers speakers={extract_speakers_from_hits(props.search.results.hits.hits)} />
    </Col>
    <Col sm={9}>
      <h2>Keresés eredménye</h2>
      <Results results={props.search.results.hits} />
    </Col>
  </Row>
)

const mapStateToProps = state => ({
  search: state.search
})

const mapDispatchToProps = dispatch => bindActionCreators({
  update_search,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
