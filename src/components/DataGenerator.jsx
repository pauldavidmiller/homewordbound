import React from "react";
import {
  addDays,
  arraysAreEqual,
  getCurrentDateTime,
  getRandomNumber,
} from "../bff/utilities.js";

const DataGenerator = ({
  numDaysParameterData,
  dictionary,
  debugParameterData,
}) => {
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
    const randomWordLength = getRandomWordLength(3, 7);
    const randomNumberTilesGiven = getRandomNumberTilesGiven(randomWordLength);
    const randomLettersAndPositionsOfTilesGiven =
      getRandomLettersAndPositionsOfTilesGiven(
        randomWordLength,
        randomNumberTilesGiven
      );

    return randomLettersAndPositionsOfTilesGiven;
  };

  const getAllWordsFromLetters = (randomLettersAndPositionsOfTilesGiven) => {
    const allWordsWithGivenLettersAndPositions =
      getAllWordsWithGivenLettersAndPositions(
        randomLettersAndPositionsOfTilesGiven
      );

    return allWordsWithGivenLettersAndPositions;
  };

  const generateValidSetsOfParameters = (numSets) => {
    const parameterData = [];

    // Go through numSets and create that much data
    for (let i = 0; i < numSets; i++) {
      // Validate each dataset has a good range of words
      let letters = [];
      let allWords = [];
      do {
        // Validate the letter set hasn't been used before
        do {
          letters = generateSetOfLetters();
        } while (
          parameterData?.find((dataSet) =>
            arraysAreEqual(letters, dataSet.letters)
          ) !== undefined
        );

        allWords = getAllWordsFromLetters(letters);
      } while (allWords.length < 8 || allWords.length > 30);

      const singleParameterData = {
        day: addDays(getCurrentDateTime(), i),
        letters: letters,
        allWords: allWords,
      };

      parameterData.push(singleParameterData);

      if (debugParameterData) {
        console.log("ParameterData #" + (i + 1) + " finished!");
      }
    }

    if (debugParameterData) {
      console.log(parameterData);
    }

    var tab = window.open("about:blank", "_blank");
    tab.document.write(JSON.stringify(parameterData));
    tab.document.close();
  };

  return (
    <div className="p-2">
      <button
        type="button"
        className="btn-blue justify-center h-10 max-w-max mx-4"
        onClick={(e) => {
          e.preventDefault();
          localStorage.clear();
        }}
      >
        Clear Storage
      </button>
      <button
        type="button"
        className="btn-blue justify-center h-10 max-w-max mx-4"
        onClick={(e) => {
          e.preventDefault();
          generateValidSetsOfParameters(numDaysParameterData);
        }}
      >
        Generate All Data
      </button>
    </div>
  );
};

export default DataGenerator;
