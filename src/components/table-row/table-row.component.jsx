import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './table-row.scss';

function TableRow ({ children, onClickedRow, onSelected, selected = false }) {
  
  const [checked, setChecked] = useState(false);
  
  const handleChange = e => {  
    setChecked(!checked) 
    onSelected && onSelected(e)
  }

  const handleRowClick = e => {
    onClickedRow && onClickedRow(e)
  }

  useEffect(() => {
    setChecked(selected)
  }, [selected])  

  return (
    <tr 
      className="TableRow"
      onClick={handleRowClick}
    >
      {!onSelected
      ? null
      : (
        <td>
          <input 
            type="checkbox" 
            checked={checked}
            onChange={handleChange}
          />
        </td>
      )}
      {children}
    </tr>
  )

}

TableRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
}

export default TableRow;