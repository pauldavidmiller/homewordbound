import React from "react";

const Dice = ({ draw }) => {
  if (draw === 1) {
    return <div className="dice img-1"></div>;
  } else if (draw === 2) {
    return <div className="dice img-2"></div>;
  } else if (draw === 3) {
    return <div className="dice img-3"></div>;
  } else if (draw === 4) {
    return <div className="dice img-4"></div>;
  } else if (draw === 5) {
    return <div className="dice img-5"></div>;
  } else if (draw === 6) {
    return <div className="dice img-6"></div>;
  } else {
    return <div className="dice ">!!!</div>;
  }
};

const DiceRoll = ({ doRoll, setDoRoll, cheatValue }) => {
  const faces = 6;
  const maxRollTimes = 15;

  const [intrvl, setIntrvl] = React.useState();
  const [diceFace, setDiceFace] = React.useState(1);
  const [rollTimes, setRollTimes] = React.useState();

  const rollDice = React.useCallback(() => {
    clearInterval(intrvl);
    let counter = maxRollTimes; // Math.floor(Math.random() * maxRollTimes + 1);
    setRollTimes(counter);
    const interval = setInterval(() => {
      setDiceFace(Math.floor(Math.random() * faces) + 1);
      counter--;
      setRollTimes(counter);
    }, 200);
    setIntrvl(interval);
  }, [intrvl]);

  React.useEffect(() => {
    if (doRoll) {
      rollDice();

      setDoRoll(false);
    }
    if (rollTimes === 0) {
      clearInterval(intrvl);
      if (
        cheatValue !== null &&
        cheatValue !== undefined &&
        cheatValue >= 1 &&
        cheatValue <= 6
      ) {
        setDiceFace(cheatValue);
      }
    }
  }, [cheatValue, doRoll, intrvl, rollDice, rollTimes, setDoRoll]);

  return <Dice draw={diceFace} />;
};

export default DiceRoll;

/* .dice {
  width: 100px;
  height: 100px;
}

.img-1 {
  background-image: url("https://imgur.com/a005G8C.png");
}

.img-2 {
  background-image: url("https://imgur.com/j9AlaxW.png");
}

.img-3 {
  background-image: url("https://imgur.com/IyAYTXb.png");
}

.img-4 {
  background-image: url("https://imgur.com/ecaqBPo.png");
}

.img-5 {
  background-image: url("https://imgur.com/RfPJMxb.png");
}

.img-6 {
  background-image: url("https://imgur.com/HmZcCX6.png");
} */
