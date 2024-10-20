import React, { useState } from "react";
import { ILab } from "../../../API/api";
import classes from "./CreateLab.module.css";

interface CreateLabProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLab: (lab: ILab) => void;
}

const CreateLab: React.FC<CreateLabProps> = ({ isOpen, onClose, onAddLab }) => {
  const [labNumber, setLabNumber] = useState<number>(0);
  const [maxPoints, setMaxPoints] = useState<number>(0);
  const [subjectId, setSubjectId] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLab: ILab = {
      id: Date.now(),
      lab_number: labNumber,
      max_points: maxPoints,
      subjectId: subjectId,
      userLabProgress: [],
    };
    onAddLab(newLab);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <span className={classes.close} onClick={onClose}>
          &times;
        </span>
        <h2 className={classes.modal_h2}>Добавить лабораторную работу</h2>
        <form className={classes.moadal_form} onSubmit={handleSubmit}>
          <div className={classes.modal_container}>
            <label className={classes.moadal_label} htmlFor="labNumber">
              Номер лабораторной работы:
            </label>
            <input
              className={classes.moadal_input}
              type="number"
              id="labNumber"
              value={labNumber}
              onChange={(e) => setLabNumber(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label className={classes.moadal_label} htmlFor="maxPoints">
              Максимальное количество баллов:
            </label>
            <input
              className={classes.moadal_input}
              type="number"
              id="maxPoints"
              value={maxPoints}
              onChange={(e) => setMaxPoints(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label className={classes.moadal_label} htmlFor="subjectId">
              ID предмета:
            </label>
            <input
              className={classes.moadal_input}
              type="number"
              id="subjectId"
              value={subjectId}
              onChange={(e) => setSubjectId(Number(e.target.value))}
              required
            />
          </div>
          <button className={classes.moadal_button}>Добавить</button>
          <button className={classes.moadal_close} onClick={onClose}>
            Отмена
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLab;
