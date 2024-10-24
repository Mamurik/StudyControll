import { FC } from "react";
import { IUserLabProgress } from "../../API/api";
import classes from "./ProgressResults.module.css";

interface ProgressResultsProps {
  filteredLabProgress: IUserLabProgress[];
}

const ProgressResults: FC<ProgressResultsProps> = ({ filteredLabProgress }) => {
  let subjectProgress = filteredLabProgress.reduce(
    (acc: number, process: IUserLabProgress) => {
      return acc + process.status;
    },
    0
  );

  let subjectMaxPoints = filteredLabProgress.reduce(
    (acc: number, progress: IUserLabProgress) => {
      return acc + (progress.lab?.max_points ?? 0);
    },
    0
  );

  let calculatePercent =
    subjectMaxPoints > 0
      ? Math.floor((subjectProgress / subjectMaxPoints) * 100)
      : 0;

  const subjectCompleted = () => {
    let completed = "";
    if (calculatePercent === 100) {
      return (completed = "Поздравляю! Все лабы по предмету выполнены");
    } else {
      return (completed = "Не все лабы выполнены");
    }
  };
  return (
    <div className={classes.progress_results}>
      <p className={classes.progress_results_p}>
        Полученные Баллы: {subjectProgress}
      </p>
      <p className={classes.progress_results_p}>
        Максимум Баллов: {subjectMaxPoints}
      </p>

      <input
        className={classes.progress_results_inpt}
        type="range"
        disabled
        value={calculatePercent}
      />
      <label className={classes.progress_results_p} htmlFor="input">
        {calculatePercent} %
      </label>
      <p className={classes.progress_results_p}>{subjectCompleted()}</p>
    </div>
  );
};

export default ProgressResults;
