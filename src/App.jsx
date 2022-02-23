import React from "react";
import Header from "./components/Header.jsx";
import Modal from "./components/Modal.jsx";
import Main from "./components/Main.jsx";
import { getDictionary } from "./data/main_dictionary_object.jsx";

import "./App.css";

const App = () => {
  const [animateParameters, setAnimateParameters] = React.useState(false);
  const [profileClosed, setProfileClosed] = React.useState(true);
  // Dictionary is initialized here so that typing the letters is faster and doesn't rerender with Main
  const [dictionary, setDictionary] = React.useState(getDictionary());

  return (
    <div className="app">
      <Modal
        name="Profile"
        modalClosed={profileClosed}
        setModalClosed={setProfileClosed}
      >
        This is the profile
      </Modal>
      <Header setProfileClosed={setProfileClosed} />
      <Main animateParameters={animateParameters} dictionary={dictionary} />
      <div className="pt-4">
        <button
          type="button"
          className="btn-blue justify-center h-10 w-30"
          onClick={(e) => {
            e.preventDefault();
            localStorage.clear();
          }}
        >
          Clear Storage
        </button>
      </div>
    </div>
  );
};

export default App;
