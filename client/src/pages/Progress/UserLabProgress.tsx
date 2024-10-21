import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetUserLabProgressQuery } from "../../http/userLabProgressApi";
import { IUserLabProgress } from "../../API/api";
import classes from "./UserLabProgres.module.css";
const UserLabProgress: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const username = useSelector((state: RootState) => state.user.user?.username);

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

  if (isLoading) return <div>Загрузка...</div>;
  if (error) {
    let errorMessage = "Неизвестная ошибка";

    if ("status" in error && "data" in error) {
      errorMessage = `Ошибка: ${error.status} ${JSON.stringify(error.data)}`;
    } else if ("message" in error) {
      errorMessage = `Ошибка: ${error.message}`;
    }

    return <h1 style={{ textAlign: "center" }}>У пользователя нет лаб</h1>;
  }

  return (
    <div>
      <h2>Прогресс по лабораторным работам</h2>
      {userLabProgress && userLabProgress.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Название предмета</th>
              <th>Номер лабораторной</th>
              <th>Макс. баллы</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {userLabProgress.map((progress: IUserLabProgress) => (
              <tr key={progress.id}>
                <td>{progress.lab?.subject?.name || "Без предмета"}</td>
                <td>{progress.lab?.lab_number || "N/A"}</td>
                <td>{progress.lab?.max_points || "N/A"}</td>
                <td>
                  <input type="range" min="0" max="5" />
                  {progress.status}/5
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
