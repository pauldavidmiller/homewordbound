import {
  faCalendarMinus,
  faCaretDown,
  faCaretUp,
  faQuestion,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classnames from "tailwindcss-classnames";
import { getCurrentDateTime, openDictionariesNewTab } from "../bff/utilities";
import { getPreviousParameterData } from "../data/data";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CorrectWords = ({ correctWords, pctWordsFound, className }) => {
  const [previousWordsOpen, setPreviousWordsOpen] = React.useState(false);
  const [previousParameters] = useLocalStorage(
    "homewordbound-previouswords",
    getPreviousParameterData()
  );

  const share = async (e) => {
    e.preventDefault();

    const numWords = Math.round((pctWordsFound * 100) / 10);
    let word = "";
    for (let i = 0; i < numWords; i++) {
      if (i === 5) {
        word += "\n";
      }
      word += "⚪";
    }

    word = `HomeWordBound - ${getCurrentDateTime()}\n\n${word} ➡️ ${
      pctWordsFound * 100
    }%`;

    await navigator.clipboard.writeText(word);
  };

  return (
    <div className={classnames("correct-words", className)}>
      <div className="row justify-center gap-2 pb-1">
        <h1 className="text-base font-bold text-gray-200 text-center whitespace-nowrap">
          <span className="text-center text-green-500 pr-1">
            {correctWords?.length}
          </span>
          <span className="text-center pr-1">
            Word{correctWords?.length !== 1 ? "s" : ""} Found -
          </span>
          <span className="text-center text-green-500">
            {Math.round(pctWordsFound * 100)}%
          </span>
        </h1>
        <button
          type="button"
          className="btn-green self-center "
          onClick={(e) => share(e)}
        >
          <FontAwesomeIcon icon={faShare} size="lg" />
        </button>
        <button
          type="button"
          className="btn-blue self-center"
          onClick={(e) => setPreviousWordsOpen((x) => !x)}
        >
          <FontAwesomeIcon icon={faCalendarMinus} size="lg" />
          <FontAwesomeIcon
            icon={previousWordsOpen ? faCaretUp : faCaretDown}
            size="lg"
            className="ml-2"
          />
        </button>
      </div>

      {previousWordsOpen ? (
        <div className="column self-center">
          <div className="text-base text-center text-blue-400 font-bold underline">
            {previousParameters.day + " Game Recap"}
          </div>
          <div className="row self-center gap-1">
            <div className="text-white">Previous Parameters:</div>
            {previousParameters.letters.map((letter, i) => {
              return (
                <div
                  key={i}
                  className="text-base text-amber-400 border-amber-400 font-semibold"
                >
                  {letter !== null ? (
                    letter.toUpperCase()
                  ) : (
                    <FontAwesomeIcon
                      icon={faQuestion}
                      size="sm"
                      className="pb-0.5"
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap max-h-min">
            {previousParameters.allWords.sort().map((word, i) => {
              return (
                <div
                  key={i}
                  className="search-dropdown-list-item text-amber-500 border-amber-500"
                  onClick={(e) => {
                    e.preventDefault();
                    openDictionariesNewTab(word);
                  }}
                >
                  {word}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap max-h-min self-center">
          {correctWords?.sort().map((correctWord, i) => {
            return (
              <div
                key={i}
                className="search-dropdown-list-item text-gray-200 border-emerald-500"
                onClick={(e) => {
                  e.preventDefault();
                  openDictionariesNewTab(correctWord);
                }}
              >
                {correctWord}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CorrectWords;
