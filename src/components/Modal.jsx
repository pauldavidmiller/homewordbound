import React from "react";
import classnames from "tailwindcss-classnames";

const Modal = ({ name, modalOpen, setModalOpen, className, children }) => {
  return (
    <>
      {modalOpen && (
        <div className={classnames("modal", className)}>
          <header className="text-xl font-bold bg-gray-400 p-3 rounded">
            {name}
          </header>
          {children}
          <button
            type="button"
            className="btn-blue absolute bottom-2 right-3.5"
            onClick={() => setModalOpen(false)}
          >
            OK
          </button>
        </div>
      )}
    </>
  );
};

export default Modal;
