import React from "react";

const Modal = ({ name, modalClosed, setModalClosed, children }) => {
  return (
    <div className="modal" hidden={modalClosed}>
      <div className="modal-main">
        <header className="text-2xl font-bold bg-gray-400 p-3 rounded">
          {name}
        </header>
        <div>{children}</div>
        <button
          type="button"
          className="btn-blue float-right px-2"
          onClick={() => setModalClosed(true)}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
