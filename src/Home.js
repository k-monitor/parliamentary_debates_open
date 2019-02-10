import React from 'react';
import {Row, Col, FormControl} from 'react-bootstrap';
import {navigate_to_search} from './store/modules/search';
import {open_modal} from './store/modules/search';
import {close_modal} from './store/modules/search';
import {toggle} from './store/modules/help';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Results from './Results.js';
import Filter from './Filter.js';
import Help from './Help.js';
import {DelayInput} from 'react-delay-input';
import Loading from 'react-loading-bar';
import Datetime from 'react-datetime';
require('moment/locale/hu');

const parseDate = string =>
  string
    ? string.replace('.', '-').replace('.', '-') + 'T12:00:00.000Z'
    : string;

const Home = props => (
  <Row>
    <Loading show={props.search.loading} color="red" showSpinner={false} />
    <Col sm={3}>
      <h2>Kereső</h2>
      <DelayInput
        minLength={3}
        delayTimeout={300}
        element={FormControl}
        value={props.search.term}
        onChange={event =>
          props.navigate_to_search({
            ...props.search,
            term: event.target.value || '',
          })
        }
      />
      {props.search.term && props.search.term.length >= 3 ? (
        <div>
          <h2>Felszólalók</h2>
          <Filter
            counts={props.search.results.aggregations.speakers.buckets}
            field_name="speaker"
            onChange={speaker =>
              props.navigate_to_search({
                ...props.search,
                speaker_filter: speaker.speaker,
              })
            }
            filter_value={props.search.speaker_filter}
          />
          <h2>Dátum</h2>
          <h3>Ettől a naptól:</h3>
          <Datetime
            timeFormat={false}
            value={parseDate(props.search.start_date)}
            onChange={value =>
              props.navigate_to_search({
                ...props.search,
                start_date: value.format('YYYY.MM.DD.'),
              })
            }
            locale="hu"
            input={false}
          />
          <h3>Eddig a napig:</h3>
          <Datetime
            timeFormat={false}
            value={parseDate(props.search.end_date)}
            onChange={value =>
              props.navigate_to_search({
                ...props.search,
                end_date: value.format('YYYY.MM.DD.'),
              })
            }
            locale="hu"
            input={false}
          />
        </div>
      ) : null}
    </Col>
    <Col sm={9}>
      <Help show={props.help.show} toggle={props.toggle} />
      <Results
        results={props.search.results}
        page={props.search.page}
        hitOpen={props.search.hitOpen}
        navigate_to_page={n => props.navigate_to_search(props.search, n)}
        open_modal={props.open_modal}
        close_modal={props.close_modal}
        term={props.search.term}
      />
    </Col>
  </Row>
);

const mapStateToProps = state => ({
  search: state.search,
  help: state.help,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      navigate_to_search,
      open_modal,
      close_modal,
      toggle,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
