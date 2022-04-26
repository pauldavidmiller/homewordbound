import React from "react";
import classnames from "tailwindcss-classnames";

const Modal = ({
  name,
  modalOpen,
  setModalOpen,
  className,
  footer,
  children,
}) => {
  return (
    <>
      {modalOpen && (
        <div className={classnames("modal", className)}>
          <header className="text-lg font-bold bg-gray-400 rounded pl-2">
            {name}
          </header>
          {children}
          <div>
            <button
              type="button"
              className="btn-blue float-right"
              onClick={() => setModalOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
