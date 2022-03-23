import React from "react";
import classnames from "tailwindcss-classnames";

const CorrectWords = ({ correctWords, pctWordsFound, className }) => {
  return (
    <div className={classnames("correct-words", className)}>
      <h1 className="text-lg font-bold text-gray-200 text-center whitespace-nowrap mb-2">
        <span className="text-center text-green-500 pr-1">
          {correctWords?.length}
        </span>
        <span className="text-center pr-1">Found Words -</span>
        <span className="text-center text-green-500">
          {Math.round(pctWordsFound * 100)}%
        </span>
      </h1>
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
