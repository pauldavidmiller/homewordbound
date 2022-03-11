import React from "react";
import classnames from "tailwindcss-classnames";
import List from "./List";

const CorrectWords = ({ correctWords, isOpen, className }) => {
  return (
    <div className={classnames("mx-5", className)}>
      <h1 className="text-2xl font-bold text-gray-200 text-center whitespace-nowrap mt-2 mb-3">
        <span className="text-center text-green-500 mr-1">
          {correctWords?.length}
        </span>
        Found Words
      </h1>
      {/* <List
        items={correctWords}
        render={(virtualRow) => {
          return (
            <div
              className="search-dropdown-list-item text-gray-200 h-6"
              key={virtualRow.index}
              style={{
                // position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                // transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="truncate px-2">
                {correctWords[virtualRow.index]}
              </div>
            </div>
          );
        }}
        isOpen={isOpen}
      /> */}
      <div className="flex flex-wrap h-96">
        {correctWords?.sort().map((correctWord, i) => {
          return (
            <div
              key={i}
              className="search-dropdown-list-item text-gray-200 px-2 mx-1 h-6"
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
