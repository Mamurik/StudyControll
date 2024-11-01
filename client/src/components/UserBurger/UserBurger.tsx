import React from "react";
import classes from "./UserBurger.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { LAB_ROUTE } from "../../utils/consts";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setIsOpen } from "../../store/Slices/burgerSlice";
import Timer from "../UI/Timer/Timer";

const UserBurger = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const userAvatar = `${process.env.PUBLIC_URL}/assets/user.png`;
  const isOpen = useSelector((state: RootState) => state.burger.isOpen);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setIsOpen(false));
  };
  return (
    <>
      {user && (
        <div className={isOpen ? classes.open : classes.close}>
          <FontAwesomeIcon
            className={classes.burger_icon}
            onClick={handleClose}
            icon={faTimes}
          ></FontAwesomeIcon>
          <img
            className={classes.user_avatar}
            alt="userAvatar"
            src={userAvatar}
          ></img>
          <h1 className={classes.user_h1}>{user.username}</h1>
          {user.role === "admin" ? (
            <p className={classes.user_p}>Роль: Администратор</p>
          ) : (
            <p className={classes.user_p}>Роль: Студент</p>
          )}
          <Timer></Timer>
          <Link className={classes.user_link} to={LAB_ROUTE}>
            Поиск по лабе
          </Link>
        </div>
      )}
    </>
  );
};

export default UserBurger;
