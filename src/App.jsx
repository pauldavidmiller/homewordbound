import React from "react";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import DataGenerator from "./components/DataGenerator.jsx";
import Profile from "./components/Profile.jsx";
import Info from "./components/Info.jsx";
import { getCombinedDictionary } from "./data/final_combined_dictionary.jsx";

import "./App.css";
import WordValidator from "./components/WordValidator.jsx";

const createParameterData = false;
const numDaysParameterData = 2000;
const debugParameterData = true;

const App = () => {
  // Dictionary is initialized here so that typing the letters is faster and doesn't rerender with Main
  const [dictionary] = React.useState(getCombinedDictionary());
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  return (
    <div className="app">
      {/* Modals */}
      <Info infoOpen={infoOpen} setInfoOpen={setInfoOpen} />
      <Profile profileOpen={profileOpen} setProfileOpen={setProfileOpen} />

      <Header setInfoOpen={setInfoOpen} setProfileOpen={setProfileOpen} />
      <Main />
      {createParameterData && (
        <div className="main-input">
          <DataGenerator
            numDaysParameterData={numDaysParameterData}
            dictionary={dictionary}
            debugParameterData={debugParameterData}
          />
          <WordValidator />
        </div>
      )}
    </div>
  );
};

export default App;
