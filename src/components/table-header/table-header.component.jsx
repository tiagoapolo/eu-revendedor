import React from 'react';

import './table-header.scss';

function TableHeader ({ columns, onSelectAllClick, onRequestSort }) {


  return (
    <thead className="TableHeader">
      <tr>
        {!onSelectAllClick
          ? null
          : <th><input type="checkbox" name="name1" onSelect={onSelectAllClick} /></th>}
        {(columns || []).map((col, id) => (
          <th 
            key={`th_${id}`}
            onClick={onRequestSort}
          >
            <span>
              {col}              
            </span>
          </th>
        ))}        
      </tr>
    </thead>
  );
}


export default TableHeader;