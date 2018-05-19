import React from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';
import {update_search} from './store/modules/search'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Results from './Results.js'
import Filter from './Filter.js'
import {DelayInput} from 'react-delay-input';
import Loading from 'react-loading-bar'
import DatePicker from 'react-16-bootstrap-date-picker'

const parseDate = string =>
  string
    ? string.replace('.', '-').replace('.', '-') + "T12:00:00.000Z"
    : string

const Home = props => (
  <Row>
    <Loading
      show={props.search.loading}
      color="red"
      showSpinner={false}
    />
    <Col sm={3}>
      <h2>Kereső</h2>
      <DelayInput minLength={3} delayTimeout={300} element={FormControl} onChange={event => props.update_search({...props.search, term: event.target.value})} />
    {props.search.term.length > 3 ? (<div>
        <h2>Felszólalók</h2>
        <Filter counts={props.search.results.aggregations.speakers.buckets} field_name="speaker"
          onChange={speaker => props.update_search({...props.search, speaker_filter: speaker.speaker})} filter_value={props.search.speaker_filter} />
        <h2>Dátum</h2>
        <h3>Ettől a naptól:</h3>
        <DatePicker value={parseDate(props.search.start_date)} onChange={(_, value) => props.update_search({...props.search, start_date: value})} dateFormat="YYYY.MM.DD." />
        <h3>Ettől a napig:</h3>
        <DatePicker value={parseDate(props.search.end_date)} onChange={(_, value) => props.update_search({...props.search, end_date: value})} dateFormat="YYYY.MM.DD." />
      </div>) : null}
    </Col>
    <Col sm={9}>
      <Results results={props.search.results} page={props.search.page}
        navigate_to_page={n => props.update_search(props.search, n)} />
    </Col>
  </Row>
)

const mapStateToProps = state => ({
  search: state.search,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  update_search
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
