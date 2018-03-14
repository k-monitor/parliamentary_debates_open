import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col, FormControl } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <h1>parldata-frontend</h1>
        </Row>
        <Row>
          <Col sm={3}>
            <h2>Search</h2>
            <FormControl />
          </Col>
          <Col sm={9}>
            <h2>Keresés eredménye</h2>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App;
