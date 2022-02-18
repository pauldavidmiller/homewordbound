import React from "react";
import ImageWithHeader from "./ImageWithHeader";
import { getFakeDailyParameterData } from "../data/fakedata";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import CorrectWords from "./CorrectWords";
import useInterval from "../hooks/useInterval";

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

const Main = ({ dictionary }) => {
  // TODO: replace with real parameter data
  const [doAnimation, setDoAnimation] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [dailyParameters, setDailyParameters] = React.useState(
    getFakeDailyParameterData()
  );
  const [correctWords, setCorrectWords] = React.useState([]);
  const [isInvalidWordText, setInvalidWordText] = React.useState("");

  // UseIntervals
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
      letterInputs: dailyParameters?.letters?.map((x) => {
        return {
          letter: x,
        };
      }),
    },
  });
  const { fields, remove } = useFieldArray({
    control,
    name: "letterInputs",
  });

  const [focusPos, setFocusPos] = React.useState(
    dailyParameters?.letters?.indexOf(null)
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

    if (dictionary[wordLowerCase] !== "yes") {
      setInvalidWordText("Invalid Word");
    } else if (correctWords.find((x) => x === wordLowerCase) !== undefined) {
      setInvalidWordText("Already found");
    } else {
      // If in the dictionary and not already in the correctWords found array
      setInvalidWordText("");
      setCorrectWords((correctWords) => [...correctWords, wordLowerCase]);
      ///
      // TODO: Also post to database the updated correctWords
      ///
    }

    reset();
    setAllFocus(dailyParameters?.letters?.indexOf(null));
  };

  React.useEffect(() => {
    if (dailyParameters?.hasNotVisited) {
      setDoAnimation(true);
    } else {
      setDoAnimation(false);
    }

    if (!isFocused) {
      setFocus(
        `letterInputs.${dailyParameters?.letters?.indexOf(null)}.letter`
      );
      setFocusPos(dailyParameters?.letters?.indexOf(null));
      setIsFocused(true);
    }
  }, [
    dailyParameters?.hasNotVisited,
    dailyParameters?.letters,
    isFocused,
    setFocus,
  ]);

  return (
    <div className="main">
      <div
        className="main-input"
        onClick={(e) => {
          setAllFocus(focusPos);
        }}
      >
        {/* <div className="wrap justify-center">
        <button
          type="button"
          className="btn-blue text-center text-2xl my-3"
          onClick={(e) => {
            e.preventDefault();
            setDoAnimation(true);
          }}
        >
          Get Parameters
        </button>
      </div> */}
        <div className="wrap justify-center my-5">
          <ImageWithHeader
            title="Length of Word"
            imageClassName="tile-dropper"
            className="m-5"
          />
          <ImageWithHeader
            title="Number of Tiles Given"
            imageClassName="tile-dropper"
            className="m-5"
          />

          <div className="column justify-center">
            {dailyParameters?.letters
              ?.filter((letter) => letter !== null)
              ?.map((letter, index) => {
                return (
                  <div className="row justify-center my-1" key={index}>
                    <div className="tile">{letter}</div>
                    <span className="mx-3 text-white text-center text-xl py-7">
                      in Position{" "}
                      {+dailyParameters?.letters?.indexOf(letter) + +1}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="row justify-center">
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
                        const prevIndex = dailyParameters?.letters
                          ?.slice(0, index)
                          ?.lastIndexOf(null);
                        if (
                          (index + 1 === dailyParameters?.letters?.length ||
                            prevIndex === -1) &&
                          getValues(`letterInputs.${index}.letter`) !== null &&
                          getValues(`letterInputs.${index}.letter`) !== ""
                        ) {
                          setValue(`letterInputs.${index}.letter`, null);
                        } else {
                          if (prevIndex > -1) {
                            setValue(`letterInputs.${prevIndex}.letter`, null);
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
                        if (index + 1 < dailyParameters?.letters?.length) {
                          const nextIndex = dailyParameters?.letters?.indexOf(
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
          <div className="column justify-center mx-5">
            <button type="submit" className="btn-blue h-10 w-30 justify-center">
              Enter
            </button>
          </div>
        </form>

        <div className="row justify-center m-5 text-red-600 font-bold">
          {isInvalidWordText}
        </div>
      </div>
      <CorrectWords
        correctWords={correctWords}
        isOpen={true}
        className="w-40"
      />
    </div>
  );
};

export default Main;
