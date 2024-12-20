import { faArrowsUpDown, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { ISubject, IUserLabProgress } from "../../API/api";
import { getBackgroundColor } from "../../utils/funcs";
import SubjectBar from "../SubjectBar/SubjectBar";
import classes from "./ProgressTable.module.css";

interface ProgressTableProps {
  username: string | undefined;
  selectedSubject: ISubject | null;
  filteredLabProgress: IUserLabProgress[];
  isUpdateLoading: boolean;
  handleStatusChange: (id: number, e: number) => void;
  handleRemove: (id: number) => void;
}

const ProgressTable: FC<ProgressTableProps> = ({
  username,
  selectedSubject,
  filteredLabProgress,
  isUpdateLoading,
  handleStatusChange,
  handleRemove,
}) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedLabProgress = [...filteredLabProgress].sort((a, b) => {
    const labANumber = a.lab?.lab_number || 0;
    const labBNumber = b.lab?.lab_number || 0;
    return sortOrder === "asc"
      ? labANumber - labBNumber
      : labBNumber - labANumber;
  });

  return (
    <div className={classes.container}>
      <SubjectBar />
      <h2 className={classes.container_h2}>
        Прогресс по лабораторным работам пользователя {username}
      </h2>
      <h2 className={classes.container_h2}>
        {selectedSubject ? "По предмету " + selectedSubject.name : "Все "}
        {selectedSubject ? " " + selectedSubject.total_labs + " Лаб" : "Лабы"}
      </h2>
      {sortedLabProgress.length > 0 ? (
        <table className={classes.progress_table}>
          <thead className={classes.progress_thead}>
            <tr className={classes.progress_tr}>
              <th className={classes.progress_th}>Название предмета</th>
              <th className={classes.progress_th}>
                Номер лабораторной
                <FontAwesomeIcon
                  icon={faArrowsUpDown}
                  onClick={handleSort}
                  className={classes.icon}
                />
              </th>
              <th className={classes.progress_th}>Макс. баллы</th>
              <th className={classes.progress_th}>Статус</th>
            </tr>
          </thead>
          <tbody className={classes.progress_tbody}>
            {sortedLabProgress.map((progress: IUserLabProgress) => (
              <tr className={classes.progress_tr} key={progress.id}>
                <td className={classes.progress_td}>
                  {progress.lab?.subject?.name || "Без предмета"}
                </td>
                <td className={classes.progress_td}>
                  {progress.lab?.lab_number || "N/A"}
                </td>
                <td className={classes.progress_td}>
                  {progress.lab?.max_points || "N/A"}
                </td>
                <td className={classes.progress_td}>
                  <input
                    className={classes.status_input}
                    type="number"
                    value={progress.status}
                    max={5}
                    min={0}
                    onChange={(e) =>
                      handleStatusChange(progress.id, Number(e.target.value))
                    }
                    disabled={isUpdateLoading}
                    style={{
                      color: getBackgroundColor(progress.status),
                    }}
                  />
                </td>
                <td className={classes.progress_td}>
                  <FontAwesomeIcon
                    className={classes.removeIcon}
                    icon={faMinus}
                    onClick={() => handleRemove(progress.id)}
                  ></FontAwesomeIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Данные по лабораторным работам не найдены.</p>
      )}
    </div>
  );
};

export default ProgressTable;
