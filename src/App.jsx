import React from "react";
import Header from "./components/Header.jsx";
import Modal from "./components/Modal.jsx";
import Main from "./components/Main.jsx";
import { getDictionary } from "./data/main_dictionary_post_parse.jsx";

import "./App.css";
import DataGenerator from "./components/DataGenerator.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.jsx";
import { getDailyParameterData } from "./data/data.jsx";

const createParameterData = true;
const numDaysParameterData = 100;
const debugParameterData = true;

const App = () => {
  // Dictionary is initialized here so that typing the letters is faster and doesn't rerender with Main
  const [dictionary, setDictionary] = React.useState(getDictionary());
  const [profileClosed, setProfileClosed] = React.useState(true);
  const [gameData, setGameData] = useLocalStorage("gameData", {
    dailyParameters: getDailyParameterData(),
    correctWords: [],
    pctWordsFound: 0,
  });

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
      <Main gameData={gameData} setGameData={setGameData} />
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
