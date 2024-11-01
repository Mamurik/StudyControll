import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  setSelectedSubject,
  setSubjects,
  clearSelectedSubject,
} from "../../store/Slices/subjectSlice";
import { ISubject } from "../../API/api";
import classes from "./SubjectBar.module.css";
import { useGetSubjectsQuery } from "../../http/subjectApi";

const SubjectBar = () => {
  const dispatch = useDispatch();
  const subjects = useSelector((state: RootState) => state.subject.subjects);
  const { data: dataSubjects } = useGetSubjectsQuery();

  const selectedSubject = useSelector(
    (state: RootState) => state.subject.selectedSubject
  );

  useEffect(() => {
    if (dataSubjects) {
      dispatch(setSubjects(dataSubjects));
    }
  }, [dataSubjects, dispatch]);

  const handleSelectSubject = (subject: ISubject) => {
    if (selectedSubject?.id === subject.id) {
      dispatch(clearSelectedSubject());
    } else {
      dispatch(setSelectedSubject(subject));
    }
  };

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
