import React from 'react';
import {FormCheck} from 'react-bootstrap';
import './filter.css';

const Filter = ({
  onChange,
  counts,
  filter_value,
  field_name,
  getLabel = item => item.key,
  getValue = item => item.key,
}) => (
  <ul className="filter">
    <li key="">
      <FormCheck
        type="radio"
        onChange={event => onChange({[field_name]: ''})}
        checked={filter_value === ''}
        label="Összes"
      />
    </li>
    {counts.map(item => (
      <li key={item.key}>
        <FormCheck
          type="radio"
          onChange={event => onChange({[field_name]: getValue(item)})}
          checked={getValue(item) === filter_value}
          label={
            <>
              {getLabel(item)} <b>({item.doc_count})</b>
            </>
          }
        />
      </li>
    ))}
  </ul>
);

export default Filter;
