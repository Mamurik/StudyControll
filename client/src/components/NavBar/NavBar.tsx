import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsAuth, setIsAuth } from "../../store/Slices/userSlice";
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from "../../utils/consts"; // Убедитесь, что ADMIN_ROUTE импортируется
import classes from "./NavBar.module.css";

const NavBar = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  return (
    <div>
      <nav className={classes.navbar}>
        <div>
          <Link className={classes.list_item_link} to={MAIN_ROUTE}>
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
              <Link to={MAIN_ROUTE}>
                <button className={classes.list_item_but}>Выйти </button>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className={classes.list}>
            <li className={classes.list_item}>
              <Link to={LOGIN_ROUTE}>
                <button
                  className={classes.list_item_but}
                  onClick={() => dispatch(setIsAuth(true))}
                >
                  Авторизация
                </button>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
