import React, { useEffect, useState } from "react";
import classes from "./Timer.module.css";

const Timer: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [daysLeft, setDaysLeft] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const targetDate = new Date(time.getFullYear(), 11, 22);
      if (time > targetDate) {
        targetDate.setFullYear(targetDate.getFullYear() + 1);
      }
      const difference = targetDate.getTime() - time.getTime();
      const days = Math.ceil(difference / (1000 * 3600 * 24));
      setDaysLeft(days);
    };

    calculateDaysLeft();
  }, [time]);

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;

  const day = time.getDate();
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const month = monthNames[time.getMonth()];
  const year = time.getFullYear();

  return (
    <div className={classes.timer_container}>
      <h1 className={classes.timer_h1}>{timeString}</h1>
      <h2 className={classes.timer_h2}>
        {day} {month}, {year}
      </h2>
      <p className={classes.days_left}>До конца: {daysLeft} дня</p>
    </div>
  );
};

export default Timer;
