import React from "react";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import { getDictionary } from "./data/main_dictionary_post_parse.jsx";

import "./App.css";
import DataGenerator from "./components/DataGenerator.jsx";
import Profile from "./components/Profile.jsx";

const createParameterData = true;
const numDaysParameterData = 100;
const debugParameterData = true;

const App = () => {
  // Dictionary is initialized here so that typing the letters is faster and doesn't rerender with Main
  const [dictionary, setDictionary] = React.useState(getDictionary());
  const [profileClosed, setProfileClosed] = React.useState(true);

  return (
    <div className="app">
      <Profile
        profileClosed={profileClosed}
        setProfileClosed={setProfileClosed}
      />
      <Header setProfileClosed={setProfileClosed} />
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
