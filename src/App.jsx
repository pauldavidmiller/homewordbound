import React from "react";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import DataGenerator from "./components/DataGenerator.jsx";
import Profile from "./components/Profile.jsx";
import Info from "./components/Info.jsx";
import { getDictionary } from "./data/main_dictionary_post_parse.jsx";

import "./App.css";

const createParameterData = true;
const numDaysParameterData = 2000;
const debugParameterData = true;

const App = () => {
  // Dictionary is initialized here so that typing the letters is faster and doesn't rerender with Main
  const [dictionary, setDictionary] = React.useState(getDictionary());
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);

  return (
    <div className="app">
      <Info infoOpen={infoOpen} setInfoOpen={setInfoOpen} />
      <Profile profileOpen={profileOpen} setProfileOpen={setProfileOpen} />
      <Header setInfoOpen={setInfoOpen} setProfileOpen={setProfileOpen} />
      <Main />
      {createParameterData && (
        <DataGenerator
          numDaysParameterData={numDaysParameterData}
          dictionary={dictionary}
          debugParameterData={debugParameterData}
        />
      )}
    </div>
  );
};

export default App;
