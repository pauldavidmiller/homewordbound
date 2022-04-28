import React from "react";
import classnames from "tailwindcss-classnames";
import { addDays, getCurrentDateTime } from "../bff/utilities";
import useInterval from "../hooks/useInterval";

const CountdownTimer = ({ className }) => {
  const [hours, setHours] = React.useState(10);
  const [minutes, setMinutes] = React.useState(10);
  const [seconds, setSeconds] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState(true);

  const countdown = () => {
    const endDate = new Date(addDays(getCurrentDateTime(), 1));
    const today = new Date();

    const timeDiff = endDate.getTime() - today.getTime();

    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;

    let timeHours = Math.floor((timeDiff % days) / hours);
    let timeMinutes = Math.floor((timeDiff % hours) / minutes);
    let timeSeconds = Math.floor((timeDiff % minutes) / seconds);

    timeHours = timeHours < 10 ? "0" + timeHours : timeHours;
    timeMinutes = timeMinutes < 10 ? "0" + timeMinutes : timeMinutes;
    timeSeconds = timeSeconds < 10 ? "0" + timeSeconds : timeSeconds;

    setHours(timeHours);
    setMinutes(timeMinutes);
    setSeconds(timeSeconds);
    setIsLoading(false);
  };

  useInterval(countdown, 500);

  return (
    <div
      className={classnames(
        "text-black text-lg font-bold text-center whitespace-nowrap",
        className
      )}
    >
      {isLoading ? (
        <div className="countdown-timer-spinner"></div>
      ) : (
        <section className="countdown-timer-container">
          <div className="countdown-timer-countdown">
            <p>{hours}</p>
            <span className="text-white text-2xl px-1">:</span>
            <p>{minutes}</p>
            <span className="text-white text-2xl px-1">:</span>
            <p>{seconds}</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default CountdownTimer;
