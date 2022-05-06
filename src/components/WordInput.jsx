import React from "react";
import { useWatch } from "react-hook-form";
import classnames from "tailwindcss-classnames";

const Input = ({
  name,
  control,
  onKeyDown,
  register,
  index,
  readOnly,
  className,
}) => {
  const value = useWatch({
    control,
    name,
  });

  return (
    <input
      {...register(`letterInputs.${index}.letter`)}
      readOnly={readOnly}
      className={className}
      maxLength={1}
      value={value?.toUpperCase() ?? ""}
      onKeyDown={onKeyDown}
      autoComplete={"off"}
      autoCapitalize={"on"}
    />
  );
};

const WordInput = ({
  focusPos,
  setAllFocus,
  inputFlipped,
  submit,
  fields,
  register,
  control,
  letters,
  getValues,
  setValue,
  isInvalidWordText,
}) => {
  return (
    <div
      className="parameters h-32"
      onClick={(e) => {
        setAllFocus(focusPos);
      }}
    >
      <form onSubmit={submit} className="column">
        <div className="row self-center">
          {fields.map((item, index) => {
            return (
              <div className="px-0.5" key={item.id}>
                <Input
                  register={register}
                  control={control}
                  index={index}
                  name={`letterInputs.${index}.letter`}
                  className={classnames(
                    item.letter !== null
                      ? "border-2 border-red-500 cursor-default"
                      : "",
                    "tile outline-2 outline-green-500 shadow-green-700 caret-transparent"
                  )}
                  readOnly={item.letter !== null ? true : false}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      // Don't prevent default
                    } else {
                      if (e.keyCode === 8) {
                        // Delete
                        e.preventDefault();

                        const prevIndex = letters
                          ?.slice(0, index)
                          ?.lastIndexOf(null);

                        const lastIndex = letters?.lastIndexOf(null);

                        if (
                          (index === lastIndex || prevIndex === -1) &&
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
                        (e.keyCode >= 65 && e.keyCode <= 90) ||
                        (e.keyCode >= 97 && e.keyCode <= 122)
                      ) {
                        // Alphabet Upper or Lower Case
                        e.preventDefault();

                        setValue(
                          `letterInputs.${index}.letter`,
                          e.key.toUpperCase()
                        );
                        if (index + 1 < letters?.length) {
                          const nextIndex = letters?.indexOf(null, index + 1);
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
        <div className="row justify-center pt-2 text-red-600 font-bold text-xs">
          {isInvalidWordText}
        </div>
      </form>
    </div>
  );
};

export default WordInput;
