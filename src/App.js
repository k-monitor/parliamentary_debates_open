import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-loading-bar/dist/index.css'
import { Grid, Row } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom'
import Home from './Home'

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <h1>A magyar országgyűlés felszólalásai 1990 óta</h1>
        </Row>
          <Route exact path="/" component={Home} />
      </Grid>
    )
  }
}

export default App;
