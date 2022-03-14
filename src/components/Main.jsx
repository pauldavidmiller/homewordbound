import React from "react";
import ParameterSelector from "./ParameterSelector";
import { getDailyParameterData } from "../data/data";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import CorrectWords from "./CorrectWords";
import CardFlip from "./CardFlip";
import useInterval from "../hooks/useInterval";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
    />
  );
};

const Main = () => {
  // TODO: replace with real parameter data
  const [gameData, setGameData] = useLocalStorage("gameData", {
    dailyParameters: getDailyParameterData(),
    correctWords: [],
    pctWordsFound: 0,
  });

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
          letter: x,
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

  const setAllFocus = (index) => {
    setFocus(`letterInputs.${index}.letter`);
    setFocusPos(index);
  };

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
          pctWordsFound: gameData?.pctWordsFound,
        };
      });
    }

    reset();
    setAllFocus(gameData?.dailyParameters?.letters?.indexOf(null));
  };

  React.useEffect(() => {
    if (!isFocused) {
      setFocus(
        `letterInputs.${gameData?.dailyParameters?.letters?.indexOf(
          null
        )}.letter`
      );
      setFocusPos(gameData?.dailyParameters?.letters?.indexOf(null));
      setIsFocused(true);
    }

    if (gameData?.correctWords?.length > 0) {
      setGameData((gameData) => {
        return {
          dailyParameters: gameData?.dailyParameters,
          correctWords: gameData?.correctWords,
          pctWordsFound:
            gameData?.correctWords.length /
            gameData?.dailyParameters?.allWords?.length,
        };
      });
    }
  }, [
    gameData?.correctWords?.length,
    gameData?.dailyParameters.allWords.length,
    gameData?.dailyParameters?.letters,
    isFocused,
    setFocus,
    setGameData,
  ]);

  return (
    <div className="main">
      <div
        className="main-input"
        onClick={(e) => {
          setAllFocus(focusPos);
        }}
      >
        <div className="container row self-center justify-center my-5">
          <div className="column justify-center">
            <ParameterSelector
              title="Length of Word"
              className="mt-5 ml-5 mr-8 mb-5"
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
              title="Number of Tiles Given"
              className="mt-5 ml-5 mr-8 mb-5"
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

          <div className="column justify-center pl-5 w-60 whitespace-nowrap">
            <CardFlip
              flipped={revealedParametersFlipped}
              frontChildren={<div className="question-mark" />}
              backChildren={
                <div className="column justify-center">
                  {gameData?.dailyParameters?.letters
                    ?.filter((letter) => letter !== null)
                    ?.map((letter, index) => {
                      return (
                        <div className="row justify-center my-1" key={index}>
                          <div className="tile">{letter?.toUpperCase()}</div>
                          <div className="row">
                            <div className="mx-3 text-center text-xl py-7">
                              <span>in Position </span>
                              <span>
                                {+gameData?.dailyParameters?.letters?.indexOf(
                                  letter
                                ) + +1}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              }
            />
          </div>
        </div>

        <CardFlip
          flipped={inputFlipped}
          frontChildren={<div className="container row bottom-0 h-40" />}
          backChildren={
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="container column bottom-0 h-40"
            >
              <div className="row self-center">
                {fields.map((item, index) => {
                  return (
                    <div className="px-1" key={item.id}>
                      <Input
                        register={register}
                        control={control}
                        index={index}
                        name={`letterInputs.${index}.letter`}
                        className="tile pb-2 border border-black"
                        disabled={item.letter !== null ? true : false}
                        onKeyDown={(e) => {
                          if (e.keyCode === 13) {
                            // Don't prevent default
                          } else {
                            e.preventDefault();
                            if (e.keyCode === 8) {
                              // Delete
                              const prevIndex =
                                gameData?.dailyParameters?.letters
                                  ?.slice(0, index)
                                  ?.lastIndexOf(null);
                              if (
                                (index + 1 ===
                                  gameData?.dailyParameters?.letters?.length ||
                                  prevIndex === -1) &&
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
                              // Alphabet Upper or Lower Case
                              (e.keyCode >= 65 && e.keyCode <= 90) ||
                              (e.keyCode >= 97 && e.keyCode <= 122)
                            ) {
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
                <div className="column justify-center ml-5 mr-1">
                  <button
                    type="submit"
                    className="btn-blue justify-center h-10 w-30"
                  >
                    Enter
                  </button>
                </div>
              </div>
              <div className="row justify-center mt-2 text-red-600 font-bold">
                <span className="h-10">{isInvalidWordText}</span>
              </div>
            </form>
          }
        />
      </div>
      <CorrectWords
        correctWords={gameData?.correctWords}
        pctWordsFound={gameData?.pctWordsFound}
        className="correct-words"
      />
    </div>
  );
};

export default Main;
