import React from "react";
import classes from "./UserBurger.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { LAB_ROUTE } from "../../utils/consts";
import { Link } from "react-router-dom";

const UserBurger = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const userAvatar = `${process.env.PUBLIC_URL}/assets/user.png`;
  const isOpen = useSelector((state: RootState) => state.burger.isOpen);
  return (
    <>
      {user && (
        <div className={isOpen ? classes.open : classes.close}>
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
          <Link className={classes.user_link} to={LAB_ROUTE}>
            Поиск по лабе
          </Link>
        </div>
      )}
    </>
  );
};

export default UserBurger;
