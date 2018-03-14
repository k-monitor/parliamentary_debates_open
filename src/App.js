import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Row } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom'
import Home from './Home'

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Link to="/"><h1>parldata-frontend</h1></Link>
        </Row>
          <Route exact path="/" component={Home} />
      </Grid>
    )
  }
}

export default App;
