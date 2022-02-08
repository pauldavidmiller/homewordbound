export const getPercentile = (wordCount, totalWordCount) => {
  return Math.round((wordCount * 100.0) / totalWordCount) / 100;
};
