import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import useInterval from "../hooks/useInterval";
import CorrectWords from "./CorrectWords";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getDailyParameterData } from "../data/data";
import Parameters from "./Parameters";
import WordInput from "./WordInput";
import CardFlip from "./CardFlip";

const Main = () => {
  const [gameData, setGameData] = useLocalStorage("homewordbound-state", {
    dailyParameters: getDailyParameterData(),
    correctWords: [],
  });
  const [statisticsData, setStatisticsData] = useLocalStorage(
    "homewordbound-statistics",
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
    if (wordLengthFlipped) {
      setNumTilesFlipped(true);
    }
    if (numTilesFlipped) {
      setRevealedParametersFlipped(true);
    }
    if (revealedParametersFlipped) {
      setInputFlipped(true);
    }
  }, 3000);

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
    // document.addEventListener("click", () =>
    //   setAllFocus(gameData?.dailyParameters?.letters?.indexOf(null))
    // );

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
    setStatisticsData,
  ]);

  return (
    <div className="main-input">
      <CardFlip
        flipped={inputFlipped}
        frontChildren={
          !inputFlipped ? (
            <Parameters
              focusPos={focusPos}
              setAllFocus={setAllFocus}
              letters={gameData?.dailyParameters?.letters}
              wordLengthFlipped={wordLengthFlipped}
              numTilesFlipped={numTilesFlipped}
              revealedParametersFlipped={revealedParametersFlipped}
            />
          ) : (
            <div />
          )
        }
        backChildren={
          <WordInput
            focusPos={focusPos}
            setAllFocus={setAllFocus}
            submit={handleSubmit(onSubmit)}
            fields={fields}
            register={register}
            control={control}
            letters={gameData?.dailyParameters?.letters}
            getValues={getValues}
            setValue={setValue}
            isInvalidWordText={isInvalidWordText}
          />
        }
      />

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
