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

const NavBar = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state: RootState) => state.burger.isOpen);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleBurger = () => {
    dispatch(setIsOpen(!isOpen));
  };

  return (
    <div>
      <nav className={classes.navbar}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button onClick={toggleBurger} className={classes.burgerButton}>
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
          </button>
          <Link className={classes.list_item_link} to={USERLABPROGRESS_ROUTE}>
            StudyControll
          </Link>
        </div>
        {isAuth ? (
          <ul className={classes.list}>
            <li className={classes.list_item}>
              <Link to={ADMIN_ROUTE}>
                <button className={classes.list_item_but}>Админ Панель</button>
              </Link>
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
      <UserBurger />
    </div>
  );
};

export default NavBar;
