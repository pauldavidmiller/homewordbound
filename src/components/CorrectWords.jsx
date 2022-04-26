import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classnames from "tailwindcss-classnames";
import { getCurrentDateTime } from "../bff/utilities";

const CorrectWords = ({ correctWords, pctWordsFound, className }) => {
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
      <div className="row justify-center pb-1">
        <h1 className="text-base font-bold text-gray-200 text-center whitespace-nowrap">
          <span className="text-center text-green-500 pr-1">
            {correctWords?.length}
          </span>
          <span className="text-center pr-1">Found Words -</span>
          <span className="text-center text-green-500">
            {Math.round(pctWordsFound * 100)}%
          </span>
        </h1>
        <button
          type="button"
          className="btn-green self-center mx-2"
          onClick={(e) => share(e)}
        >
          <span className="text-sm">Share</span>
          <FontAwesomeIcon icon={faShare} size="xs" className="ml-2" />
        </button>
      </div>
      <div className="flex flex-wrap max-h-min">
        {correctWords?.sort().map((correctWord, i) => {
          return (
            <div key={i} className="search-dropdown-list-item">
              {correctWord}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CorrectWords;
