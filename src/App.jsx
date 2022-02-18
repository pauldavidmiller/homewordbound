import React from "react";
import Header from "./components/Header.jsx";
import Modal from "./components/Modal.jsx";
import Main from "./components/Main.jsx";
import { getDictionary } from "./data/main_dictionary_object.jsx";

import "./App.css";

const App = () => {
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
      <Main dictionary={dictionary} />
    </div>
  );
};

export default App;
