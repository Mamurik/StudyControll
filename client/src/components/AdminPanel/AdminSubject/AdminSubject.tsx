import React, { useState } from "react";
import SubjectModal from "./SubjectModal/SubjectModal";
import classes from "./Admin.module.css";
const AdminSubject = () => {
  const [modal, setModal] = useState<boolean>(false);

  const toggleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModal(!modal);
  };

  return (
    <div className={modal ? classes.openModal : classes.closeModal}>
      <SubjectModal setModal={setModal} modal={modal}></SubjectModal>
      <button onClick={toggleModal}>Модальное окно для предметов</button>
    </div>
  );
};

export default AdminSubject;
