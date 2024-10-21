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
    data: userProgress = [],
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
    <div className={classes.container}>
      <h1 className={classes.progress_h1}>Прогресс пользователя: {username}</h1>
      {userProgress.map((progress: IUserLabProgress) => (
        <div className={classes.progress_List} key={progress.id}>
          <h2 className={classes.progress_h2}>
            Лабораторная работа ID: {progress.labId}
          </h2>
          <h3 className={classes.progress_h3}>
            Статус (0-5): {progress.status}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default UserLabProgress;
