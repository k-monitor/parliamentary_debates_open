import React, {Component} from 'react';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.css';
import {Container} from 'react-bootstrap';
import Home from './Home';
import {Button, Navbar, Nav} from 'react-bootstrap';
import {toggle} from './store/modules/help';
import {bindActionCreators} from 'redux';

import {navigate_to_search} from './store/modules/search';

import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import logo from './logo.jpg';
import LoadingBar from 'react-top-loading-bar';

class App extends Component {
  UNSAFE_componentWillMount() {
    document.title = 'A magyar országgyűlés felszólalásai 1990 óta';
  }

  render() {
    return (
      <>
        <LoadingBar
          onLoaderFinished={() => null}
          progress={this.props.search.loading ? 20 : 100}
          color="red"
        />
        <Navbar bg="dark" expand="lg" sticky="top">
          <Navbar.Brand
            href="#"
            onClick={() => this.props.navigate_to_search({term: ''})}>
            <img src={logo} height={40} />
            &nbsp; Az Országgyűlés felszólalásai 1990 óta
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" />
            <Button onClick={this.props.toggle}>
              <FontAwesomeIcon icon={faInfoCircle} />
              &nbsp;
              <span>Mi ez?</span>
            </Button>
          </Navbar.Collapse>
        </Navbar>
        <Container style={{marginTop: '2em'}}>
          <Home />
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  help: state.help,
  search: state.search,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggle,
      navigate_to_search,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
