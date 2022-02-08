import React from "react";
import ImageWithHeader from "./ImageWithHeader";
import { getFakeDailyParameterData } from "../data/fakedata";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

const Input = ({ name, control, register, index, disabled, className }) => {
  const value = useWatch({
    control,
    name,
  });
  return (
    <input
      {...register(`letterInputs.${index}.letter`)}
      defaultValue={value}
      disabled={disabled}
      className={className}
      maxLength={1}
    />
  );
};

const Main = () => {
  const [doAnimation, setDoAnimation] = React.useState(false);
  // TODO: replace with real parameter data
  const [dailyParameters, setDailyParameters] = React.useState(
    getFakeDailyParameterData()
  );
  const { register, control, getValues, handleSubmit } = useForm({
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
  }, [dailyParameters?.hasNotVisited]);

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
            ?.filter((letter) => letter !== "_")
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
      <div className="row justify-center">
        {fields.map((item, index) => {
          // TODO: make this input text field and make it nullable if one of the default letters
          console.log(item);
          return (
            <div className="px-1" key={item.id}>
              <Input
                register={register}
                control={control}
                index={index}
                name={`letterInputs.${index}.letter`}
                className="tile pb-2 border border-black"
                disabled={item.letter !== "_" ? true : false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
