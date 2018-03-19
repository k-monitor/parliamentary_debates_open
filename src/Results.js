import React from 'react';
import BillboardChart from "react-billboardjs";
import { counts } from './transformations'
import { Row, Col } from 'react-bootstrap';

const Results = ({ results }) => (
  <div>
  <h2>{results.length} találat:</h2>
  <h3>Summary</h3>
    <Row>
      <Col sm={6}>
    <h4>Speakers</h4>
    <BillboardChart unloadBeforeLoad data={({
      'type': 'bar',
      'columns': Object.entries(counts(results, result => result._source.speaker)),
      'groups': Object.keys(counts(results, result => result._source.speaker)).map(i => [i])
    })} />
      </Col>
      <Col sm={6}>
    <h4>Topics</h4>
    <BillboardChart unloadBeforeLoad data={({
      'type': 'bar',
      'columns': Object.entries(counts(results, result => result._source.topic))
    })} />
      </Col>
    </Row>
  <h3>Results</h3>
  <div>{
    results.map(result => (
      <p key={ result._id }>{ result._source.text }</p>
    ))
  }</div>
  </div>
)


export default Results
