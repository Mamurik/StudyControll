import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IUserLabProgress } from "../../API/api";
import ProgressResults from "../../components/ProgressResults/ProgressResults";
import ProgressTable from "../../components/ProgressTable/ProgressTable";
import Loader from "../../components/UI/Loader/Loader";
import {
  useAddUserLabProgressMutation,
  useGetUserLabProgressQuery,
  useRemoveUserLabProgressMutation,
  useUpdateUserLabProgressMutation,
} from "../../http/userLabProgressApi";
import { RootState } from "../../store/store";
import classes from "./UserLabProgres.module.css";
import { setUserLabProgress } from "../../store/Slices/userLabProgressSlice";
import { useDispatch } from "react-redux";

const UserLabProgress: React.FC = () => {
  const dispatch = useDispatch();
  const idOfUser = useSelector((state: RootState) => state.user.user?.id);
  const username = useSelector((state: RootState) => state.user.user?.username);
  const selectedSubject = useSelector(
    (state: RootState) => state.subject.selectedSubject
  );
  const [addLabProgress, { isLoading: isAddingLabProgress }] =
    useAddUserLabProgressMutation();
  const {
    data: userLabProgress = [],
    isLoading,
    error,
    refetch,
  } = useGetUserLabProgressQuery(idOfUser as number, { skip: !idOfUser });
  const [updateStatus, { isLoading: isUpdateLoading }] =
    useUpdateUserLabProgressMutation();
  const [removeLabProgress, { isLoading: isRemovingLabProgress }] =
    useRemoveUserLabProgressMutation();
  const [localProgress, setLocalProgress] =
    useState<IUserLabProgress[]>(userLabProgress);

  const [input, setInput] = useState<number>(0);
  const handleAdd = async () => {
    if (!idOfUser) return;
    try {
      const newProgress: IUserLabProgress = {
        id: Date.now(),
        status: 0,
        labId: input,
        userId: idOfUser,
      };
      const result = await addLabProgress(newProgress).unwrap();
      dispatch(setUserLabProgress([...userLabProgress, result]));
      setLocalProgress((prevProgress) => [...prevProgress, result]);
      setInput(0);
      await refetch();
    } catch (error) {
      console.log("error");
    }
  };

  const handleRemove = async (labProgressId: number) => {
    try {
      await removeLabProgress(labProgressId).unwrap();
      refetch();
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

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
      console.error("Ошибка обновления", err);
    }
  };

  if (!idOfUser) {
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
        handleRemove={handleRemove}
        input={input}
        setInput={setInput}
        handleAdd={handleAdd}
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
