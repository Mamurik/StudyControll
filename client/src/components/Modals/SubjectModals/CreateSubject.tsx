import React from "react";
import { ISubject } from "../../../API/api";
import classes from "./CreateSubject.module.css";

interface CreateSubjectProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSubject: (subject: ISubject) => void;
}

const CreateSubject: React.FC<CreateSubjectProps> = ({
  isOpen,
  onClose,
  onAddSubject,
}) => {
  if (!isOpen) return null;
  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <span className={classes.close} onClick={onClose}>
          &times;
        </span>
        <h2 className={classes.modal_h2}>Добавить предмет</h2>
        <form className={classes.moadal_form}>
          <div className={classes.modal_container}>
            <label className={classes.moadal_label} htmlFor="subjectName">
              Название предмета:
            </label>
            <input
              className={classes.moadal_input}
              type="text"
              id="subjectName"
            />
          </div>
          <div>
            <label className={classes.moadal_label} htmlFor="totalLabs">
              Количество лабораторных работ:
            </label>
            <input
              className={classes.moadal_input}
              type="number"
              id="totalLabs"
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

export default CreateSubject;
