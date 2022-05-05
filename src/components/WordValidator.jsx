import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { openDataNewTab, openDictionaryNewTab } from "../bff/utilities";
import { getWeekParameterData } from "../data/data";

const WordValidator = () => {
  const [weekParameterData, setWeekParameterData] = React.useState(
    getWeekParameterData()
  );

  return (
    <div className="word-validator">
      <div className="text-center text-white font-bold text-base">
        Word Validator
      </div>
      <div className="row w-full">
        {weekParameterData?.map((dayData, indexx) => {
          return (
            <div className="column w-full mx-1" key={indexx}>
              <div
                className="text-base text-center text-blue-400 font-bold underline cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  for (let i = 0; i < dayData?.allWords.length; i++) {
                    const word = dayData?.allWords[i];
                    openDictionaryNewTab(word);
                  }
                }}
              >
                {dayData?.day}
              </div>
              {dayData?.allWords.map((word, indexy) => {
                return (
                  <div
                    key={indexy}
                    className="row border rounded-md border-gray-500 font-normal"
                  >
                    <button
                      type="button"
                      className="btn-blue font-light w-full"
                      onClick={(e) => {
                        e.preventDefault();

                        openDictionaryNewTab(word);
                      }}
                    >
                      {word}
                    </button>
                    <button
                      type="button"
                      className="float-right"
                      onClick={(e) => {
                        e.preventDefault();

                        const tempDay = dayData;
                        const newDayWords = dayData?.allWords?.filter(
                          (x) => x !== word
                        );
                        tempDay.allWords = newDayWords;

                        const tempWeekParameterData = weekParameterData;
                        tempWeekParameterData[indexx] = tempDay;

                        setWeekParameterData((x) => [...tempWeekParameterData]);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faWindowClose}
                        size="lg"
                        className="bg-gray-400"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="btn-green mt-2"
        onClick={(e) => {
          e.preventDefault();

          openDataNewTab(weekParameterData);
        }}
      >
        Complete
      </button>
    </div>
  );
};

export default WordValidator;
