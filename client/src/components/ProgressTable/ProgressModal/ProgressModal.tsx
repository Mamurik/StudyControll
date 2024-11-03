import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useGetLabByIdQuery } from "../../../http/labApi";
import classes from "./ProgressModal.module.css"; // Make sure this file contains the styles you've provided

interface ProgressModalProps {
  input: number;
  setInput: React.Dispatch<React.SetStateAction<number>>;
  handleAdd: () => Promise<void>;
  toggleModal: (e: React.MouseEvent) => void;
  show: boolean;
}

const ProgressModal: React.FC<ProgressModalProps> = ({
  input,
  setInput,
  handleAdd,
  toggleModal,
  show,
}) => {
  const {
    data: labDetails,
    isLoading: labLoading,
    error: labError,
  } = useGetLabByIdQuery(input, { skip: input <= 0 });

  const [currentLabDetails, setCurrentLabDetails] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>(input.toString());

  useEffect(() => {
    if (labError) {
      setCurrentLabDetails(null);
    } else if (labDetails) {
      setCurrentLabDetails(labDetails);
    }
  }, [labDetails, labError]);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    handleAdd();
    toggleModal(e);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setInput(value ? Number(value) : 0);
  };

  if (!show) return null;

  return (
    <div className={classes.openModal} onClick={toggleModal}>
      <div
        className={classes.modal_container}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={classes.icon} onClick={toggleModal}>
          &times;
        </span>
        <h2>Добавить лабораторную работу</h2>
        <form>
          <input
            type="number"
            placeholder="Айди лабы"
            value={inputValue}
            onChange={handleInputChange}
            required
            className={classes.modal_input} // Add CSS class
          />
          {labLoading && <div>Загрузка...</div>}
          {labError && <div>Ошибка: Лабораторная работа не найдена</div>}
          {currentLabDetails && (
            <div>
              <h3>Лабораторная работа: {currentLabDetails.lab_number}</h3>
              <h4>Предмет: {currentLabDetails.subject?.name || "Не указан"}</h4>
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={!currentLabDetails}
            className={classes.modal_but}
          >
            <FontAwesomeIcon icon={faPlus} /> Добавить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProgressModal;
