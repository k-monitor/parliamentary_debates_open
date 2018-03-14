import React from 'react';

const Results = ({ results }) => results.hits.map(result => (
  <p key={ result._id }>{ result._source.text }</p>
))


export default Results
