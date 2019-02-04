import React, {Component} from 'react';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.css';
import 'react-loading-bar/dist/index.css';
import {Container, Row} from 'react-bootstrap';
import Home from './Home';

class App extends Component {
  UNSAFE_componentWillMount() {
    document.title = 'A magyar országgyűlés felszólalásai 1990 óta';
  }

  render() {
    return (
      <Container>
        <Row>
          <h1>A magyar országgyűlés felszólalásai 1990 óta</h1>
        </Row>
        <Home />
      </Container>
    );
  }
}

export default App;
