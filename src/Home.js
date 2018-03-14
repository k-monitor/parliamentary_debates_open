import React from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';

const Home = () => (
  <Row>
    <Col sm={3}>
      <h2>Search</h2>
      <FormControl />
    </Col>
    <Col sm={9}>
      <h2>Keresés eredménye</h2>
    </Col>
  </Row>
)

export default Home
