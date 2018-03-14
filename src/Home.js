import React from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';
import {update_search} from './store/modules/search'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Results from './Results.js'

const Home = props => (
  <Row>
    <Col sm={3}>
      <h2>Search</h2>
      <FormControl onChange={event => props.update_search(event.target.value)} />
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
