import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './not-found.scss';

export default function NotFound () {

  let history = useHistory();
  
  useEffect(() => {
    
    const timeout = setTimeout(() => history.push("/"), 2000);

    return () => {
      clearTimeout(timeout)
    }
  }, [history])

  return (
    <div className="NotFound">
      <div className="text">
        <h2>Página não encontrada</h2>
        <p>Redirecionando para o login</p>
      </div>      
    </div>
  )
}

