import React from 'react';
import './Header.css';


function Header() {
  return (
    <div className="App">
        <p className="App-header">
          Custom questions
        </p>
        <p className="App-text" >
        You must add at least one queston to launch a survey.
      </p>
      <div className="questions-header">
         <p  className="text">
          <b> Question </b>
         </p>
         <p>
          <b> Question settings </b>
         </p>
      </div>
    <div>
      <hr />
    </div>
  
    </div>
     
  );
}

export default Header;
