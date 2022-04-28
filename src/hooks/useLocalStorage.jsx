import React from "react";
import { getCurrentDateTime } from "../bff/utilities.js";

function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = localStorage.getItem(key);
  if (saved !== null) {
    const parsedSaved = JSON.parse(saved);

    // Reset daily state if new / different day
    if (
      key === "homewordbound-state" &&
      (parsedSaved?.dailyParameters?.day === undefined ||
        getCurrentDateTime(parsedSaved.dailyParameters.day) !==
          getCurrentDateTime())
    ) {
      return defaultValue;
    }

    // Reset previous words if new / different day
    if (
      key === "homewordbound-previouswords" &&
      (parsedSaved?.day === undefined ||
        getCurrentDateTime(parsedSaved.day) !== getCurrentDateTime())
    ) {
      return defaultValue;
    }

    return parsedSaved;
  }
  return defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = React.useState(() => {
    return getStorageValue(key, defaultValue);
  });

  React.useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
