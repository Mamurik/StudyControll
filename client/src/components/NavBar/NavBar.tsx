import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setIsOpen } from "../../store/Slices/burgerSlice";
import { logout, selectIsAuth } from "../../store/Slices/userSlice";
import { RootState } from "../../store/store";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  USERLABPROGRESS_ROUTE,
} from "../../utils/consts";
import classes from "./NavBar.module.css";
import UserBurger from "../UserBurger/UserBurger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

const NavBar = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state: RootState) => state.burger.isOpen);
  const userBurgerRef = useRef<HTMLDivElement | null>(null);
  const userRole = useSelector((state: RootState) => state.user.user?.role);
  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleBurger = () => {
    dispatch(setIsOpen(!isOpen));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      userBurgerRef.current &&
      !userBurgerRef.current.contains(event.target as Node) &&
      isOpen
    ) {
      dispatch(setIsOpen(false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <nav className={classes.navbar}>
        <div className={classes.navbar_left}>
          <button onClick={toggleBurger} className={classes.burgerButton}>
            <FontAwesomeIcon
              className={
                isOpen ? classes.burger_icon_close : classes.burger_icon
              }
              icon={faBars}
            />
          </button>
          <Link className={classes.list_item_link} to={USERLABPROGRESS_ROUTE}>
            StudyControll
          </Link>
        </div>
        {isAuth ? (
          <ul className={classes.list}>
            <li className={classes.list_item}>
              {userRole === "admin" && (
                <Link to={ADMIN_ROUTE}>
                  <button className={classes.list_item_but}>
                    Админ Панель
                  </button>
                </Link>
              )}
            </li>
            <li className={classes.list_item}>
              <Link to={USERLABPROGRESS_ROUTE}>
                <button
                  className={classes.list_item_but}
                  onClick={handleLogout}
                >
                  Выйти
                </button>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className={classes.list}>
            <li className={classes.list_item}>
              <button
                className={classes.list_item_but}
                onClick={() => navigate(LOGIN_ROUTE)}
              >
                Авторизация
              </button>
            </li>
          </ul>
        )}
      </nav>
      <div ref={userBurgerRef}>
        <UserBurger />
      </div>
    </div>
  );
};

export default NavBar;
