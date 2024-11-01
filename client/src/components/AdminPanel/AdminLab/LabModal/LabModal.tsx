import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState } from "react";
import {
  useAddLabMutation,
  useGetLabQuery,
  useRemovelabMutation,
} from "../../../../http/labApi";
import { useGetSubjectsQuery } from "../../../../http/subjectApi";
import classes from "./LabModal.module.css";

interface LabModalProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
}

const LabModal: FC<LabModalProps> = ({ modal, setModal }) => {
  const { data: labs = [], refetch: refetchLabs } = useGetLabQuery();
  const { data: subjects = [] } = useGetSubjectsQuery();
  const [addLab] = useAddLabMutation();
  const [removeLab] = useRemovelabMutation();

  const [labNumber, setLabNumber] = useState<number>(0);
  const [maxPoints, setMaxPoints] = useState<number>(0);
  const [subjectId, setSubjectId] = useState<number>(0);

  const handleAddLab = async () => {
    try {
      const lab = {
        id: Date.now(),
        lab_number: labNumber,
        max_points: maxPoints,
        subjectId,
      };
      await addLab(lab).unwrap();
      await refetchLabs();
      setLabNumber(0);
      setMaxPoints(0);
      setSubjectId(0);
    } catch (error) {
      console.log("Ошибка при добавлении Лабы:", error);
    }
  };

  const handleLabRemove = async (labId: number) => {
    try {
      await removeLab(labId).unwrap();
      await refetchLabs();
    } catch (error) {
      console.error("Ошибка при удалении Лабы:", error);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setModal(false);
    }
  };

  // Фильтрация лабораторных работ по выбранному предмету
  const filteredLabs = subjectId
    ? labs.filter((lab) => lab.subjectId === subjectId)
    : labs;

  return (
    <div
      onClick={handleBackgroundClick}
      className={modal ? classes.openModal : classes.closeModal}
    >
      <div className={classes.modal_container}>
        <FontAwesomeIcon
          onClick={() => setModal(false)}
          className={classes.icon}
          icon={faTimes}
        />
        <input
          className={classes.modal_input}
          type="number"
          value={labNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLabNumber(Number(e.target.value));
          }}
          placeholder="Номер Лабы"
        />
        <input
          className={classes.modal_input}
          type="number"
          value={maxPoints}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setMaxPoints(Number(e.target.value));
          }}
          min="1"
          placeholder="Максимальные баллы"
        />
        <select
          className={classes.modal_input}
          value={subjectId || ""}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSubjectId(Number(e.target.value));
          }}
        >
          <option value="" disabled>
            Выберите предмет
          </option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        <button className={classes.modal_but} onClick={handleAddLab}>
          ДОБАВИТЬ ЛАБУ
        </button>
      </div>
      <div className={classes.lab_list}>
        <ul className={classes.lab_list_ul}>
          {filteredLabs.map((lab) => (
            <li className={classes.lab_list_item} key={lab.id}>
              Лаба {lab.lab_number} - {lab.max_points} баллов
              <button onClick={() => handleLabRemove(lab.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LabModal;
