import React from 'react';
import {
  Row,
  Col,
  FormControl,
  Card,
  Button,
  CardColumns,
} from 'react-bootstrap';
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
import HomepageKeywords from './homepage_keywords.json';
import ChartData from './ChartData.json';
import Chart from './Chart';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {DateRange} from 'react-date-range';
require('moment/locale/hu');

const parseDate = string =>
  string
    ? string.replace('.', '-').replace('.', '-') + 'T12:00:00.000Z'
    : string;

const Home = props => (
  <>
    <Row>
      <Loading show={props.search.loading} color="red" showSpinner={false} />
      <Col sm={props.search.term === '' ? 12 : 3}>
        <h2>Kereső</h2>
        <DelayInput
          minLength={3}
          delayTimeout={300}
          element={FormControl}
          value={props.search.term}
          placeholder="Kezdjen el gépelni egy keresőkifejezést"
          onChange={event =>
            props.navigate_to_search({
              ...props.search,
              term: event.target.value || '',
            })
          }
        />
        <CardColumns style={{marginTop: '3em'}}>
          {props.search.term === '' &&
            HomepageKeywords.map(keyword => (
              <Card key={keyword}>
                <Card.Header>{keyword}</Card.Header>
                <Card.Body>
                  <Chart
                    {...ChartData[keyword]}
                    width={300}
                    height={120}
                    mini
                  />
                  <Button
                    variant="primary"
                    onClick={() =>
                      props.navigate_to_search({
                        term: keyword,
                      })
                    }>
                    Keresés
                  </Button>
                </Card.Body>
              </Card>
            ))}
        </CardColumns>
        {props.search.term && props.search.term.length >= 3 ? (
          <div className="filterTools">
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
            <DateRange
              moveRangeOnFirstSelection={false}
              ranges={[{}]}
              className={'PreviewArea'}
            />
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
      <Col sm={props.search.term === '' ? 0 : 9}>
        <Help toggle={props.toggle} show={props.help.show} />
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
  </>
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
