import React from "react";
import classnames from "tailwindcss-classnames";
import List from "./List";

const CorrectWords = ({ correctWords, isOpen, className }) => {
  return (
    <div className={classnames("mx-5", className)}>
      <h1 className="font-bold text-gray-200 text-center mt-5 mb-1">
        <span className="text-center text-green-500 mr-1">
          {correctWords?.length}
        </span>
        Found Words
      </h1>
      <List
        items={correctWords}
        render={(virtualRow) => {
          return (
            <div
              className="search-dropdown-list-item text-gray-200"
              key={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="truncate px-2">
                {correctWords[virtualRow.index]}
              </div>
            </div>
          );
        }}
        isOpen={isOpen}
      />
    </div>
  );
};

export default CorrectWords;
