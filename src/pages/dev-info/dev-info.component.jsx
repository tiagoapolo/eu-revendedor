import React from 'react';

import './dev-info.scss';

function DevInfo () {

  return (
    <div className="DevInfo">
      <div className="container">        
        <p className="developed">Desenvolvido por</p>
        <div className="liner"/>
        <h2>Tiago Lopes de Paiva Dionysio da Fonseca</h2>
        <p>Engenheiro de Software</p>
        <p>(41) 9 9973-5883</p>
        <div className="links">
          <a href="https://www.linkedin.com/in/tiago-fonseca/" target="_blank" rel="noopener noreferrer" >Linkedin</a>
          <a href="https://github.com/tiagoapolo" target="_blank" rel="noopener noreferrer" >GitHub</a>
          <a href="https://github.com/tiagoapolo/tiagoapolo.github.io/blob/master/files/tiago_fonseca_cv_2019%20(1).pdf" target="_blank"  rel="noopener noreferrer" >Currículo</a>
        </div>        
      </div>
    </div>
  )

}

export default DevInfo;