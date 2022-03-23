import React from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import useInterval from "../hooks/useInterval";
import ParameterSelector from "./ParameterSelector";
import CorrectWords from "./CorrectWords";
import CardFlip from "./CardFlip";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getDailyParameterData } from "../data/data";
import classnames from "tailwindcss-classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltRight,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

const Input = ({
  name,
  control,
  onKeyDown,
  register,
  index,
  disabled,
  className,
}) => {
  const value = useWatch({
    control,
    name,
  });

  return (
    <input
      {...register(`letterInputs.${index}.letter`)}
      disabled={disabled}
      className={className}
      maxLength={1}
      value={value?.toUpperCase() ?? ""}
      onKeyDown={onKeyDown}
      autoComplete={"off"}
      autoCapitalize={"on"}
    />
  );
};

const Main = () => {
  const [gameData, setGameData] = useLocalStorage("wordict-state", {
    dailyParameters: getDailyParameterData(),
    correctWords: [],
  });
  const [statisticsData, setStatisticsData] = useLocalStorage(
    "wordict-statistics",
    {
      [gameData?.dailyParameters?.day]: {
        pctWordsFound:
          gameData?.correctWords.length /
          gameData?.dailyParameters?.allWords?.length,
      },
    }
  );

  const [isFocused, setIsFocused] = React.useState(false);
  const [wordLengthFlipped, setWordLengthFlipped] = React.useState(false);
  const [numTilesFlipped, setNumTilesFlipped] = React.useState(false);
  const [revealedParametersFlipped, setRevealedParametersFlipped] =
    React.useState(false);
  const [inputFlipped, setInputFlipped] = React.useState(false);
  const [isInvalidWordText, setInvalidWordText] = React.useState("");

  // UseIntervals
  useInterval(() => {
    if (isFocused) {
      setWordLengthFlipped(true);
    }
  }, 1000);

  useInterval(() => {
    if (wordLengthFlipped) {
      setNumTilesFlipped(true);
    }
    if (numTilesFlipped) {
      setRevealedParametersFlipped(true);
    }
    if (revealedParametersFlipped) {
      setInputFlipped(true);
    }
  }, 2000);

  useInterval(() => {
    if (isInvalidWordText !== "") {
      setInvalidWordText("");
    }
  }, 3000);

  // Input Array
  const {
    register,
    control,
    setValue,
    reset,
    getValues,
    setFocus,
    handleSubmit,
  } = useForm({
    defaultValues: {
      letterInputs: gameData?.dailyParameters?.letters?.map((x) => {
        return {
          letter: x !== null ? x.toUpperCase() : null,
        };
      }),
    },
  });
  const { fields } = useFieldArray({
    control,
    name: "letterInputs",
  });

  const [focusPos, setFocusPos] = React.useState(
    gameData?.dailyParameters?.letters?.indexOf(null)
  );

  const setAllFocus = React.useCallback(
    (index) => {
      setFocus(`letterInputs.${index}.letter`);
      setFocusPos(index);
    },
    [setFocus]
  );

  const onSubmit = async (data) => {
    // Check against correctWords and add to list if valid
    const values = getValues()?.letterInputs?.map((x) => x.letter);

    let word = "";
    for (var letter in values) {
      word += values[letter];
    }

    const wordLowerCase = word.toLowerCase();

    if (!gameData?.dailyParameters?.allWords?.includes(wordLowerCase)) {
      setInvalidWordText("Invalid Word");
    } else if (
      gameData?.correctWords.find((x) => x === wordLowerCase) !== undefined
    ) {
      setInvalidWordText("Already found");
    } else {
      // If in the given words and not already in the correctWords found array
      setInvalidWordText("");
      setGameData((gameData) => {
        return {
          dailyParameters: gameData?.dailyParameters,
          correctWords: [...gameData?.correctWords, wordLowerCase],
        };
      });
    }

    reset();
    setAllFocus(gameData?.dailyParameters?.letters?.indexOf(null));
  };

  React.useEffect(() => {
    document.addEventListener("click", () =>
      setAllFocus(gameData?.dailyParameters?.letters?.indexOf(null))
    );

    if (!isFocused) {
      setAllFocus(gameData?.dailyParameters?.letters?.indexOf(null));
      setIsFocused(true);
    }

    if (gameData?.dailyParameters?.day) {
      setStatisticsData((statisticsData) => ({
        ...statisticsData,
        [gameData?.dailyParameters?.day]: {
          pctWordsFound:
            gameData?.correctWords.length /
            gameData?.dailyParameters?.allWords?.length,
        },
      }));
    }
  }, [
    gameData?.correctWords.length,
    gameData?.dailyParameters?.allWords?.length,
    gameData?.dailyParameters?.day,
    gameData?.dailyParameters?.letters,
    isFocused,
    setAllFocus,
    setFocus,
    setGameData,
    setStatisticsData,
  ]);

  return (
    <div
      className="main-input"
      onClick={(e) => {
        setAllFocus(focusPos);
      }}
    >
      <div className="parameters">
        <div className="column justify-center border-r-2 border-t-2 border-b-2 border-blue-400">
          <ParameterSelector
            title="Word Length"
            className="pt-5 pl-5 pr-8 pb-5"
          >
            <CardFlip
              flipped={wordLengthFlipped}
              frontChildren={<div className="tile">ℓ</div>}
              backChildren={
                <div className="tile">
                  {gameData?.dailyParameters?.letters?.length}
                </div>
              }
            />
          </ParameterSelector>
          <ParameterSelector
            title="# Tiles Given"
            className="pt-5 pl-5 pr-8 pb-5"
          >
            <CardFlip
              flipped={numTilesFlipped}
              frontChildren={<div className="tile">#</div>}
              backChildren={
                <div className="tile">
                  {
                    gameData?.dailyParameters?.letters?.filter(
                      (letter) => letter !== null
                    )?.length
                  }
                </div>
              }
            />
          </ParameterSelector>
        </div>

        <FontAwesomeIcon
          icon={faLongArrowAltRight}
          size="3x"
          className="self-center text-blue-400 -pl-0.5"
        />

        <div className="column justify-center w-60 whitespace-nowrap">
          <CardFlip
            flipped={revealedParametersFlipped}
            frontChildren={
              <FontAwesomeIcon
                icon={faQuestion}
                size="7x"
                className="text-white"
              />
            }
            backChildren={
              <div className="column justify-center">
                {gameData?.dailyParameters?.letters
                  ?.filter((letter) => letter !== null)
                  ?.map((letter, index) => {
                    return (
                      <div className="row justify-center py-1" key={index}>
                        <div className="tile">{letter?.toUpperCase()}</div>
                        <div className="row text-center text-md pl-2 self-center">
                          <span>in Position</span>
                          <span className="pl-2">
                            {+gameData?.dailyParameters?.letters?.indexOf(
                              letter
                            ) + +1}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            }
          />
        </div>
      </div>

      <div className="card-flip h-40">
        <CardFlip
          flipped={inputFlipped}
          frontChildren={<div className="row" />}
          backChildren={
            <form onSubmit={handleSubmit(onSubmit)} className="column">
              <div className="row self-center">
                {fields.map((item, index) => {
                  return (
                    <div className="px-1" key={item.id}>
                      <Input
                        register={register}
                        control={control}
                        index={index}
                        name={`letterInputs.${index}.letter`}
                        className={classnames(
                          item.letter !== null ? "border-2 border-red-500" : "",
                          "tile pb-2 outline-2 outline-green-500 shadow-green-700 caret-transparent"
                        )}
                        disabled={item.letter !== null ? true : false}
                        onKeyDown={(e) => {
                          if (e.keyCode === 13) {
                            // Don't prevent default
                          } else {
                            if (e.keyCode === 8) {
                              // Delete
                              e.preventDefault();

                              const prevIndex =
                                gameData?.dailyParameters?.letters
                                  ?.slice(0, index)
                                  ?.lastIndexOf(null);

                              const lastIndex =
                                gameData?.dailyParameters?.letters?.lastIndexOf(
                                  null
                                );

                              if (
                                (index === lastIndex || prevIndex === -1) &&
                                getValues(`letterInputs.${index}.letter`) !==
                                  null &&
                                getValues(`letterInputs.${index}.letter`) !== ""
                              ) {
                                setValue(`letterInputs.${index}.letter`, null);
                              } else {
                                if (prevIndex > -1) {
                                  setValue(
                                    `letterInputs.${prevIndex}.letter`,
                                    null
                                  );
                                  setAllFocus(prevIndex);
                                }
                              }
                            } else if (
                              (e.keyCode >= 65 && e.keyCode <= 90) ||
                              (e.keyCode >= 97 && e.keyCode <= 122)
                            ) {
                              // Alphabet Upper or Lower Case
                              e.preventDefault();

                              setValue(
                                `letterInputs.${index}.letter`,
                                e.key.toUpperCase()
                              );
                              if (
                                index + 1 <
                                gameData?.dailyParameters?.letters?.length
                              ) {
                                const nextIndex =
                                  gameData?.dailyParameters?.letters?.indexOf(
                                    null,
                                    index + 1
                                  );
                                if (nextIndex > -1) {
                                  setAllFocus(nextIndex);
                                }
                              }
                            }
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <button type="submit" className="btn-blue self-center mt-2">
                Enter
              </button>
              <div className="row justify-center pt-2 text-red-600 font-bold">
                <span className="h-10">{isInvalidWordText}</span>
              </div>
            </form>
          }
        />
      </div>

      <CorrectWords
        correctWords={gameData?.correctWords}
        pctWordsFound={
          statisticsData[gameData?.dailyParameters?.day]?.pctWordsFound
        }
      />
    </div>
  );
};

export default Main;
