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

  /// GENERATING DATA
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  const getRandomWordLength = (min, max) => {
    return getRandomNumber(min, max);
  };
  const getRandomNumberTilesGiven = (wordLength) => {
    return getRandomNumber(
      Math.ceil(wordLength / 3),
      Math.ceil(wordLength / 2)
    );
  };
  const getRandomLettersAndPositionsOfTilesGiven = (
    wordLength,
    numberTilesGiven
  ) => {
    const positions = [];
    const letters = [];

    // Get random positions
    for (let i = 0; i < numberTilesGiven; i++) {
      let randomIndex = -1;
      do {
        randomIndex = getRandomNumber(0, wordLength);
      } while (positions.find((index) => index === randomIndex) !== undefined);

      positions.push(randomIndex);
    }

    // Get random letters
    const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
    for (let i = 0; i < numberTilesGiven; i++) {
      const randomLetterIndex = getRandomNumber(0, alphabet.length);
      letters.push(alphabet[randomLetterIndex]);
    }

    // Add to object array
    const givenLettersAndPositions = [];
    for (let i = 0; i < wordLength; i++) {
      givenLettersAndPositions[i] = null;
    }
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      const position = positions[i];
      givenLettersAndPositions[position] = letter;
    }

    return givenLettersAndPositions;
  };
  const getAllWordsWithGivenLettersAndPositions = (
    givenLettersAndPositions
  ) => {
    const validWordsDict = Object.keys(dictionary)?.filter((word) => {
      let validLength = true;
      let validPositions = true;
      if (word.length !== givenLettersAndPositions.length) {
        validLength = false;
      }
      for (let i = 0; i < givenLettersAndPositions.length; i++) {
        const position = i;
        const letter = givenLettersAndPositions[i];
        if (
          letter !== null &&
          letter !== undefined &&
          word[position] !== letter
        ) {
          validPositions = false;
          break;
        }
      }

      return validLength && validPositions;
    });

    return validWordsDict;
  };

  const generateSetOfLetters = () => {
    console.log("====================================");
    console.log("Generating One Set of Letters");
    console.log("====================================");

    const randomWordLength = getRandomWordLength(3, 7);

    console.log("randomWordLength: " + randomWordLength);

    const randomNumberTilesGiven = getRandomNumberTilesGiven(randomWordLength);

    console.log("randomNumberTilesGiven:" + randomNumberTilesGiven);

    const randomLettersAndPositionsOfTilesGiven =
      getRandomLettersAndPositionsOfTilesGiven(
        randomWordLength,
        randomNumberTilesGiven
      );

    console.log(
      "randomLettersAndPositionsOfTilesGiven:" +
        JSON.stringify(randomLettersAndPositionsOfTilesGiven, null, "  ")
    );

    return randomLettersAndPositionsOfTilesGiven;
  };

  const getAllWordsFromLetters = (randomLettersAndPositionsOfTilesGiven) => {
    const allWordsWithGivenLettersAndPositions =
      getAllWordsWithGivenLettersAndPositions(
        randomLettersAndPositionsOfTilesGiven
      );

    console.log(
      "allWordsWithGivenLettersAndPositions:" +
        allWordsWithGivenLettersAndPositions
    );

    console.log(
      "valid = " +
        (allWordsWithGivenLettersAndPositions.length >= 8 &&
          allWordsWithGivenLettersAndPositions.length <= 30) +
        " length: " +
        allWordsWithGivenLettersAndPositions.length
    );

    return allWordsWithGivenLettersAndPositions;
  };

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
      <Main />
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
      <div className="pt-4">
        <button
          type="button"
          className="btn-blue justify-center h-10 w-30"
          onClick={(e) => {
            e.preventDefault();
            const letters = generateSetOfLetters();
            const allWords = getAllWordsFromLetters(letters);

            console.log("letters: " + letters);
            console.log("allWords: " + allWords);
          }}
        >
          Generate One Set of Parameters
        </button>
        <button
          type="button"
          className="btn-blue justify-center h-10 w-30 px-4"
          onClick={(e) => {
            e.preventDefault();
            let letters = [];
            let allWords = [];
            do {
              const tempLetters = generateSetOfLetters();
              const tempAllWords = getAllWordsFromLetters(tempLetters);
              letters = tempLetters;
              allWords = tempAllWords;
            } while (allWords.length < 8 || allWords.length > 30);

            console.log("letters: " + letters);
            console.log("allWords: " + allWords);
          }}
        >
          Generate First Valid Set of Parameters
        </button>
      </div>
    </div>
  );
};

export default App;
