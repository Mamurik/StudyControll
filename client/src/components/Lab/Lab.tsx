import React, { useEffect, useState } from "react";
import { useGetLabByIdQuery } from "../../http/labApi";
import { useGetSubjectsQuery } from "../../http/subjectApi";

const Lab: React.FC = () => {
  const [labId, setLabId] = useState<number | undefined>(undefined);
  const [lastLab, setLastLab] = useState<any>(null);
  const {
    data: lab,
    isLoading: labLoading,
    error: labError,
  } = useGetLabByIdQuery(labId ?? 0, {
    skip: labId === undefined,
  });

  const { data: subjects, isLoading: subjectsLoading } = useGetSubjectsQuery();

  useEffect(() => {
    if (lab && !labError) {
      setLastLab(lab);
    }
  }, [lab, labError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLabId(value ? Number(value) : undefined);
    if (value === "") {
      setLastLab(null);
    }
  };

  // Получаем название предмета по subjectId
  const subjectName = subjects?.find(
    (subject) => subject.id === lastLab?.subjectId
  )?.name;

  return (
    <div>
      <h1>Поиск лабораторной работы по ID</h1>
      <input
        type="number"
        value={labId ?? ""}
        onChange={handleInputChange}
        placeholder="Введите ID лабораторной работы"
      />
      {(labLoading || subjectsLoading) && <div>Загрузка...</div>}
      {labError && <div>Ошибка</div>}{" "}
      {lastLab && (
        <div>
          <h2>Лабораторная работа: {lastLab.lab_number}</h2>
          <h3>ID: {lastLab.id}</h3>
          <h3>Максимальные баллы: {lastLab.max_points}</h3>
          <h3>Предмет: {subjectName || "Не найден"}</h3>{" "}
        </div>
      )}
    </div>
  );
};

export default Lab;
