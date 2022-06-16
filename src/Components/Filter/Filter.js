import React from 'react';

const Filter = ({ valueFilter, onChangeFilter }) => {
  return (
    <label>
      Filter by name
      <input type="text" value={valueFilter} onChange={onChangeFilter} />
    </label>
  );
};
export default Filter;
