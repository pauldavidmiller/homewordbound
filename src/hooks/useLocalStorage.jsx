import React from "react";

function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = localStorage.getItem(key);
  if (saved !== null) {
    return JSON.parse(saved);
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
