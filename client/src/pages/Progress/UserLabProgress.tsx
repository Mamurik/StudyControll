import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IUserLabProgress } from "../../API/api";
import ProgressResults from "../../components/ProgressResults/ProgressResults";
import ProgressTable from "../../components/ProgressTable/ProgressTable";
import Loader from "../../components/UI/Loader/Loader";
import {
  useGetUserLabProgressQuery,
  useUpdateUserLabProgressMutation,
} from "../../http/userLabProgressApi";
import { RootState } from "../../store/store";
import classes from "./UserLabProgres.module.css";
const UserLabProgress: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const username = useSelector((state: RootState) => state.user.user?.username);
  const selectedSubject = useSelector(
    (state: RootState) => state.subject.selectedSubject
  );

  const {
    data: userLabProgress = [],
    isLoading,
    error,
  } = useGetUserLabProgressQuery(userId as number, { skip: !userId });

  const [updateStatus, { isLoading: isUpdateLoading }] =
    useUpdateUserLabProgressMutation();

  const [localProgress, setLocalProgress] =
    useState<IUserLabProgress[]>(userLabProgress);

  useEffect(() => {
    if (userLabProgress.length) {
      setLocalProgress(userLabProgress);
    }
  }, [userLabProgress]);

  const handleStatusChange = async (id: number, newStatus: number) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();

      setLocalProgress((prevProgress) =>
        prevProgress.map((progress) =>
          progress.id === id ? { ...progress, status: newStatus } : progress
        )
      );
    } catch (err) {
      console.error("Failed to update the lab progress", err);
    }
  };

  if (!userId) {
    return (
      <div>Пожалуйста, войдите в систему, чтобы увидеть свой прогресс.</div>
    );
  }

  if (isLoading) return <Loader />;
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
    ? localProgress.filter(
        (progress) => progress.lab?.subject?.name === selectedSubject.name
      )
    : localProgress;
  return (
    <div className={classes.main_container}>
      <ProgressTable
        handleStatusChange={handleStatusChange}
        filteredLabProgress={filteredLabProgress}
        isUpdateLoading={isUpdateLoading}
        selectedSubject={selectedSubject}
        username={username}
      />
      <ProgressResults
        filteredLabProgress={filteredLabProgress}
      ></ProgressResults>
    </div>
  );
};

export default UserLabProgress;
