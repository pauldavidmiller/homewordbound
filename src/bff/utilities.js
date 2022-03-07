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
