import React from 'react';
import { Checkbox } from 'react-bootstrap';

const Categories = ({ categories, onChange }) => (
  <ul>
    {Object.keys(categories).map(category => (
      <li key={category}>
        <Checkbox onChange={event => onChange({
          category,
          value: event.target.checked}
        )} checked={categories[category]}>
          {category}
        </Checkbox>
      </li>
    ))}
  </ul>
)

export default Categories
