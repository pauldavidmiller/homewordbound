import { getCurrentDateTime } from "../bff/utilities";

const fakeDailyParameterData = [
  {
    day: getCurrentDateTime(),
    letters: ["A", null, null, "D", null],
    allWords: ["alude", "abide", "abode"],
  },
];
export const getFakeDailyParameterData = () => {
  return fakeDailyParameterData?.find((x) => x.day === getCurrentDateTime());
};

const fakeUserData = [
  {
    username: "pmiller",
    password: "password",
    days: [
      {
        day: getCurrentDateTime(),
        words: ["alude", "abide"],
        statistics: {
          worldPlacement: 66,
        },
      },
    ],
  },
];
export const getFakeUserData = (username) => {
  return fakeUserData?.find((user) => user.username === username);
};
