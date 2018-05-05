import React from 'react';
import { Checkbox } from 'react-bootstrap';
import './filter.css'

const Speakers = ({ speakers, onChange, counts }) => (
  <ul class="filter">
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
