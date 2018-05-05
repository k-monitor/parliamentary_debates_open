import React from 'react';
import { Radio } from 'react-bootstrap';
import './filter.css'

const Speakers = ({ speakers, onChange, counts, speaker_filter }) => (
  <ul class="filter">
    <li key="">
        <Radio onChange={event => onChange({speaker: '',})} checked={speaker_filter === ''}>
          Összes <b>({Object.values(counts).reduce((a, b) => a + b, 0)})</b>
        </Radio>
    </li>
    {Object.keys(counts)
        .map(speaker => (
      <li key={speaker}>
        <Radio onChange={event => onChange({ speaker, }
        )} checked={speaker === speaker_filter}>
          {speaker} <b>({counts[speaker]})</b>
        </Radio>
      </li>
    ))}
  </ul>
)

export default Speakers
