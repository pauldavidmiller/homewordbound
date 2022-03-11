import React from "react";
import classnames from "tailwindcss-classnames";

const CorrectWords = ({ correctWords, pctWordsFound, className }) => {
  return (
    <div className={classnames("mx-5", className)}>
      <h1 className="text-2xl font-bold text-gray-200 text-center whitespace-nowrap mt-2 mb-3">
        <span className="text-center text-green-500 mr-1">
          {correctWords?.length}
        </span>
        <span className="text-center mr-1">Found Words -</span>
        <span className="text-center text-green-500">
          {Math.round(pctWordsFound * 100)}%
        </span>
      </h1>
      <div className="flex flex-wrap max-h-min">
        {correctWords?.sort().map((correctWord, i) => {
          return (
            <div
              key={i}
              className="search-dropdown-list-item text-gray-200 px-2 m-1 h-6"
            >
              {correctWord}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CorrectWords;
