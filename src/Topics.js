import React from 'react';
import { Checkbox } from 'react-bootstrap';

const Topics = ({ topics, onChange, counts }) => (
  <ul>
    {Object.keys(topics)
      .filter(topic => counts[topic] >= 1)
      .sort((a, b) => counts[a] <= counts[b])
      .map(topic => (
      <li key={topic}>
        <Checkbox onChange={event => onChange({
          topic,
          value: event.target.checked}
        )} checked={topics[topic]}>
          {topic} <b>({counts[topic]})</b>
        </Checkbox>
      </li>
    ))}
  </ul>
)

export default Topics
