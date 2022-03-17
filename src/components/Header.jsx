import React from "react";
import { faInfo, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ setInfoOpen, setProfileOpen }) => {
  return (
    <div className="header row">
      <div className="flex flex-row w-1/3">
        <button
          type="button"
          className="btn-settings mx-2"
          onClick={(e) => {
            e.preventDefault();
            setInfoOpen((x) => !x);
          }}
        >
          <FontAwesomeIcon icon={faInfo} size="lg" />
        </button>
      </div>
      <header className="text-center text-white font-bold text-3xl mt-1 w-1/3">
        Wordict
      </header>
      <div className="flex flex-row-reverse w-1/3">
        <button
          type="button"
          className="btn-profile mx-2"
          onClick={(e) => {
            e.preventDefault();
            setProfileOpen((x) => !x);
          }}
        >
          <FontAwesomeIcon icon={faUser} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default Header;
