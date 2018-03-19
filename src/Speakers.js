import React from 'react';
import { Checkbox } from 'react-bootstrap';

const Speakers = ({ speakers, onChange, counts }) => (
  <ul>
    {Object.keys(speakers)
        .filter(speaker => counts[speaker] >= 1)
        .sort((a, b) => counts[a] <= counts[b])
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
