import React from 'react';
import { Checkbox } from 'react-bootstrap';

const Speakers = ({ speakers, onChange, counts }) => (
  <ul>
    {Object.keys(counts)
        .map(speaker => (
      <li key={speaker}>
        <Checkbox onChange={event => onChange({
          speaker,
          value: event.target.checked}
        )} checked={speakers[speaker]}>
          {speaker} <b>({counts[speaker]})</b>
        </Checkbox>
      </li>
    ))}
  </ul>
)

export default Speakers
