import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-loading-bar/dist/index.css'
import { Grid, Row } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom'
import Home from './Home'

class App extends Component {
  componentWillMount() {
    document.title = 'A magyar országgyűlés felszólalásai 1990 óta'
  }

  render() {
    return (
      <Grid>
        <Row>
          <h1>Az oldal technikai okok miatt nem üzemel.</h1>
        </Row>
      </Grid>
    )
  }
}

export default App;
