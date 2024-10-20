import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  setSelectedSubject,
  setSubjects,
} from "../../store/Slices/subjectSlice";
import { ISubject } from "../../API/api";
import classes from "./SubjectBar.module.css";

const SubjectBar = () => {
  const dispatch = useDispatch();
  const subjects = useSelector((state: RootState) => state.subject.subjects);
  const selectedSubject = useSelector(
    (state: RootState) => state.subject.selectedSubject
  );

  useEffect(() => {
    const initialSubjects: ISubject[] = [
      {
        id: 1,
        name: "ВСРПП",
        total_labs: 8,
      },
      {
        id: 2,
        name: "ВВНС",
        total_labs: 5,
      },
    ];
    dispatch(setSubjects(initialSubjects));
  }, [dispatch]);

  const handleSelectSubject = (subject: ISubject) => {
    dispatch(setSelectedSubject(subject));
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
