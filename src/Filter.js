import React from 'react';
import { Radio } from 'react-bootstrap';
import './filter.css'

const Filter = ({ onChange, counts, filter_value, field_name, getLabel = (item => item.key), getValue = (item => item.key) }) => (
  <ul className="filter">
    <li key="">
        <Radio onChange={event => onChange({[field_name]: '',})} checked={filter_value === ''}>
          Összes
        </Radio>
    </li>
    {counts.map(item => (
      <li key={item.key}>
        <Radio onChange={event => onChange({ [field_name]: getValue(item), }
        )} checked={getValue(item) === filter_value}>
          {getLabel(item)} <b>({item.doc_count})</b>
        </Radio>
      </li>
    ))}
  </ul>
)

export default Filter
