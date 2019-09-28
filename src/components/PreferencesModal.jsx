import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {

  return (
    ReactDOM.createPortal(
      <div className="modalContainer">
        <div className="modalBody">
          
        </div>
      </div>
    , document.getElementById('modal'))
  )
}

export default Modal;