import React from 'react';

import './table-cell.scss';

function TableCell ({ children, type, colspan }) {


  const dataByType = (data, type) => {
    switch (type) {
      case "date":
        return new Date(data).toLocaleDateString()
      case "percentage":
        return `${String(data)}%`
      case "brl":
          return `R$ ${data}`    
      default:
        return data
    }
  }

  return(
    <td className="TableCell" colSpan={colspan}>
      {dataByType(children, type)}
    </td>
  )

}


export default TableCell