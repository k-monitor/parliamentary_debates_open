import React from 'react';
import { Checkbox } from 'react-bootstrap';

const Topics = ({ topics, onChange }) => (
  <ul>
    {Object.keys(topics).map(topic => (
      <li key={topic}>
        <Checkbox onChange={event => onChange({
          topic,
          value: event.target.checked}
        )} checked={topics[topic]}>
          {topic}
        </Checkbox>
      </li>
    ))}
  </ul>
)

export default Topics
