import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useAddSubjectMutation,
  useGetSubjectsQuery,
  useRemoveSubjectMutation,
} from "../../../../http/subjectApi";
import classes from "./SubjectModal.module.css";
import { setSubjects } from "../../../../store/Slices/subjectSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface SubjectModalProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
}
const SubjectModal: FC<SubjectModalProps> = ({ modal, setModal }) => {
  const { data: subjects = [], refetch } = useGetSubjectsQuery();
  const [addSubject] = useAddSubjectMutation();
  const [removeSubject] = useRemoveSubjectMutation();
  const dispatch = useDispatch();
  const [subjectName, setSubjectName] = useState<string>("");
  const [totalLabs, setTotalLabs] = useState<number>(1);
  const handleAddSubject = async () => {
    try {
      const subject = {
        id: Date.now(),
        name: subjectName,
        total_labs: totalLabs,
      };
      const result = await addSubject(subject).unwrap();
      dispatch(setSubjects([...subjects, result]));
      await refetch();
      setSubjectName("");
      setTotalLabs(1);
    } catch (error) {
      console.log("Ошибка при добавлении предмета:", error);
    }
  };

  const handleSubjectRemove = async (subjectId: number) => {
    try {
      await removeSubject(subjectId).unwrap();
      refetch();
    } catch (error) {
      console.error("Ошибка при удалении предмета:", error);
    }
  };
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setModal(false);
    }
  };
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
        ></FontAwesomeIcon>
        <input
          className={classes.modal_input}
          type="text"
          value={subjectName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSubjectName(e.target.value);
          }}
          placeholder="Название предмета"
        />
        <input
          className={classes.modal_input}
          type="number"
          value={totalLabs}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTotalLabs(Number(e.target.value));
          }}
          min="1"
          placeholder="Количество лабораторных"
        />
        <button className={classes.modal_but} onClick={handleAddSubject}>
          ДОБАВИТЬ
        </button>
      </div>
      <div className={classes.subject_list}>
        <ul className={classes.subject_list_ul}>
          {subjects.map((subject) => (
            <li className={classes.subject_list_item} key={subject.id}>
              {subject.name}
              <button onClick={() => handleSubjectRemove(subject.id)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubjectModal;
