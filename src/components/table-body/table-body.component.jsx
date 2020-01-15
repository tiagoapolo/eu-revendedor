import React from 'react';

import './table-body.scss';

function TableBody ({ children }) {


  return (
    <tbody className="TableBody">
      {children}
    </tbody>
  )

}

export default TableBody;