import React from "react";
import classnames from "tailwindcss-classnames";

const Modal = ({ name, modalOpen, setModalOpen, className, children }) => {
  return (
    <>
      {modalOpen && (
        <div className={classnames("modal", className)}>
          <header className="text-2xl font-bold bg-gray-400 p-3 rounded">
            {name}
          </header>
          {children}
          <button
            type="button"
            className="btn-blue px-2 absolute bottom-3 right-3"
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
