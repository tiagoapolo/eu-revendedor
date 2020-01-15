import React from 'react';
import PropTypes from 'prop-types';

import './table-container.scss';

function TableContainer ({ children }) {

  return(
    
    <table className="TableContainer">
      {children}
    </table>
  )

}

TableContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
}

export default TableContainer;