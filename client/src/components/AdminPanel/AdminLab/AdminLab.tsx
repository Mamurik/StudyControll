import React, { useState } from "react";
import LabModal from "./LabModal/LabModal";
import classes from "./AdminLab.module.css";
const AdminLab = () => {
  const [modal, setModal] = useState<boolean>(false);

  const toggleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModal(!modal);
  };

  return (
    <div className={modal ? classes.openModal : classes.closeModal}>
      <LabModal modal={modal} setModal={setModal}></LabModal>
      <button className={classes.button} onClick={toggleModal}>
        Модальное окно для Лаб
      </button>
    </div>
  );
};

export default AdminLab;
