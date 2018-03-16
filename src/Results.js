import React from 'react';

const Results = ({ results }) => (
  <div>
  <h2>{results.length} találat:</h2>,
  <div>{
    results.map(result => (
      <p key={ result._id }>{ result._source.text }</p>
    ))
  }</div>
  </div>
)


export default Results
