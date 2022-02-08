import { faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Settings from "./Settings";

const Header = ({ setProfileClosed }) => {
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  return (
    <div className="header row">
      <div className="flex flex-row w-1/3">
        <button
          type="button"
          className="btn-settings mx-2"
          onClick={(e) => {
            e.preventDefault();
            setSettingsOpen((x) => !x);
          }}
        >
          <FontAwesomeIcon icon={faCog} size="lg" />
        </button>
      </div>
      <header className="text-center text-white font-bold text-2xl mt-1 w-1/3">
        Word Game
      </header>
      <div className="flex flex-row-reverse w-1/3">
        <button
          type="button"
          className="btn-profile mx-2"
          onClick={(e) => {
            e.preventDefault();
            setProfileClosed((x) => !x);
          }}
        >
          <FontAwesomeIcon icon={faUser} size="lg" />
        </button>
      </div>
      {settingsOpen && <Settings />}
    </div>
  );
};

export default Header;
