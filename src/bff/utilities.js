export const getCurrentDateTime = (date = new Date()) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US");
};

export const addDays = (date, numDays) => {
  var result = new Date(date);
  result.setDate(result.getDate() + numDays);
  return getCurrentDateTime(result);
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const arraysAreEqual = (array1, array2) => {
  if (array1.length === array2.length) {
    return array1.every((element, index) => {
      if (element === array2[index]) {
        return true;
      }

      return false;
    });
  }

  return false;
};

export const openDataNewTab = (data) => {
  var tab = window.open("about:blank", "_blank");
  tab.document.write(JSON.stringify(data));
  tab.document.close();
};

export const openDictionaryNewTab = (word) => {
  const newWindow = window.open(
    `https://scrabble.merriam.com/finder/${word}`,
    "_blank",
    "noopener, noreferrer"
  );
  if (newWindow) newWindow.opener = null;
};
