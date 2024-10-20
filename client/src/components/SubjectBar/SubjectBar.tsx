import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  setSelectedSubject,
  setSubjects,
} from "../../store/Slices/subjectSlice";
import { useGetSubjectsQuery } from "../../http/subjectApi";
import { ISubject } from "../../API/api";
import classes from "./SubjectBar.module.css";

const SubjectBar = () => {
  const dispatch = useDispatch();
  const selectedSubject = useSelector(
    (state: RootState) => state.subject.selectedSubject
  );

  const { data: subjects = [], error, isLoading } = useGetSubjectsQuery();

  useEffect(() => {
    if (subjects.length > 0) {
      dispatch(setSubjects(subjects));
    }
  }, [subjects, dispatch]);

  const handleSelectSubject = (subject: ISubject) => {
    dispatch(setSelectedSubject(subject));
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка при загрузке данных</div>;

  return (
    <div className={classes.container}>
      <ul className={classes.subjectBar_list}>
        {subjects.map((subject) => (
          <li
            className={`${classes.subjectBar_item} ${
              selectedSubject?.id === subject.id ? classes.selected : ""
            }`}
            key={subject.id}
            onClick={() => handleSelectSubject(subject)}
          >
            {subject.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectBar;
