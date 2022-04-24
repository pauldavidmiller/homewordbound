import React from "react";
import { faHome, faInfo, faUser } from "@fortawesome/free-solid-svg-icons";
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
      <header className="text-center text-white font-bold font-serif text-4xl mt-1 w-1/3">
        HomeWordBound
        <FontAwesomeIcon icon={faHome} size="lg" className="ml-2 pb-2" />
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
