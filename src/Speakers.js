import React from 'react';

const Speakers = ({ speakers }) => (
  <ul>
    {speakers.map(speaker => (
      <li key={speaker}>{speaker}</li>
    ))}
  </ul>
)

export default Speakers
