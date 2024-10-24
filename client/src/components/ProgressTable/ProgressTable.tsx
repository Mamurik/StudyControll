import React, { FC } from "react";
import SubjectBar from "../SubjectBar/SubjectBar";
import classes from "./ProgressTable.module.css";
import { ISubject, IUserLabProgress } from "../../API/api";
import { getBackgroundColor } from "../../utils/funcs";

interface ProgressTableProps {
  username: string | undefined;
  selectedSubject: ISubject | null;
  filteredLabProgress: IUserLabProgress[];
  isUpdateLoading: boolean;
  handleStatusChange: (id: number, e: number) => void;
}
const ProgressTable: FC<ProgressTableProps> = ({
  username,
  selectedSubject,
  filteredLabProgress,
  isUpdateLoading,
  handleStatusChange,
}) => {
  return (
    <div className={classes.container}>
      <SubjectBar />
      <h2 className={classes.container_h2}>
        Прогресс по лабораторным работам пользователя {username}
      </h2>
      <h2 className={classes.container_h2}>
        {selectedSubject ? "По предмету " + selectedSubject.name : "Все "}
        {""}
        {selectedSubject ? " " + selectedSubject.total_labs + " Лаб" : "Лабы"}
      </h2>
      {filteredLabProgress.length > 0 ? (
        <table className={classes.progress_table}>
          <thead className={classes.progress_thead}>
            <tr className={classes.progress_tr}>
              <th className={classes.progress_th}>Название предмета</th>
              <th className={classes.progress_th}>Номер лабораторной</th>
              <th className={classes.progress_th}>Макс. баллы</th>
              <th className={classes.progress_th}>Статус</th>
            </tr>
          </thead>
          <tbody className={classes.progress_tbody}>
            {filteredLabProgress.map((progress: IUserLabProgress) => (
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
                      backgroundColor: getBackgroundColor(progress.status),
                    }}
                  />
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
