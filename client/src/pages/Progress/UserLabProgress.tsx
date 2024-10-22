import React from "react";
import { useSelector } from "react-redux";
import { IUserLabProgress } from "../../API/api";
import Loader from "../../components/UI/Loader/Loader";
import { useGetUserLabProgressQuery } from "../../http/userLabProgressApi";
import { RootState } from "../../store/store";
import classes from "./UserLabProgres.module.css";
import SubjectBar from "../../components/SubjectBar/SubjectBar";
const UserLabProgress: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const username = useSelector((state: RootState) => state.user.user?.username);
  const selectedSubject = useSelector(
    (state: RootState) => state.subject.selectedSubject
  );

  console.log(selectedSubject);

  const {
    data: userLabProgress = [],
    isLoading,
    error,
  } = useGetUserLabProgressQuery(userId as number, { skip: !userId });

  if (!userId) {
    return (
      <div>Пожалуйста, войдите в систему, чтобы увидеть свой прогресс.</div>
    );
  }

  if (isLoading) return <Loader></Loader>;
  if (error) {
    let errorMessage = "Неизвестная ошибка";

    if ("status" in error && "data" in error) {
      errorMessage = `Ошибка: ${error.status} ${JSON.stringify(error.data)}`;
    } else if ("message" in error) {
      errorMessage = `Ошибка: ${error.message}`;
    }
    alert(errorMessage);

    return (
      <h1 style={{ textAlign: "center" }}>У пользователя {username} нет лаб</h1>
    );
  }
  const filteredLabProgress = selectedSubject
    ? userLabProgress.filter(
        (progress) => progress.lab?.subject?.name === selectedSubject.name
      )
    : userLabProgress;

  return (
    <div className={classes.container}>
      <SubjectBar></SubjectBar>
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

export default UserLabProgress;
