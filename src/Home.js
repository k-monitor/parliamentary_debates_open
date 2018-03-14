import React from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';
import {search} from './store/modules/search'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Home = props => (
  <Row>
    <Col sm={3}>
      <h2>Search</h2>
      <FormControl onChange={event => props.search(event.target.value)} />
    </Col>
    <Col sm={9}>
      <h2>Keresés eredménye</h2>
      <p>{props.search.results}</p>
    </Col>
  </Row>
)

const mapStateToProps = state => ({
  search: state.search
})

const mapDispatchToProps = dispatch => bindActionCreators({
  search,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
