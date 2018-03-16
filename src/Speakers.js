import React from 'react';
import { Checkbox } from 'react-bootstrap';

const Speakers = ({ speakers, onChange }) => (
  <ul>
    {Object.keys(speakers).map(speaker => (
      <li key={speaker}>
        <Checkbox onChange={event => onChange({
          speaker,
          value: event.target.checked}
        )} checked={speakers[speaker]}>
          {speaker}
        </Checkbox>
      </li>
    ))}
  </ul>
)

export default Speakers
