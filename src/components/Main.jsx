import React from "react";
import ImageWithHeader from "./ImageWithHeader";
import { getFakeDailyParameterData } from "../data/fakedata";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

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
  const [doAnimation, setDoAnimation] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [dailyParameters, setDailyParameters] = React.useState(
    getFakeDailyParameterData()
  );

  // Input Array
  const { register, control, setValue, getValues, setFocus, handleSubmit } =
    useForm({
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

  const onSubmit = (data) => console.log("data", data);

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
                        setFocus(`letterInputs.${prevIndex}.letter`);
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
                        setFocus(`letterInputs.${nextIndex}.letter`);
                      }
                    }
                  }
                }}
              />
            </div>
          );
        })}
        {/* <button type="submit" className="btn-blue" */}
      </form>
    </div>
  );
};

export default Main;
