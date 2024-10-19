import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsAuth, setIsAuth } from "../../store/Slices/userSlice";
import { MAIN_ROUTE } from "../../utils/consts";
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
              <button className={classes.list_item_but}>Админ Панель</button>
            </li>
            <li className={classes.list_item}>
              <button className={classes.list_item_but}>Войти</button>
            </li>
          </ul>
        ) : (
          <ul className={classes.list}>
            <li className={classes.list_item}>
              <button
                onClick={() => dispatch(setIsAuth(true))}
                className={classes.list_item_but}
              >
                Авторизация
              </button>
            </li>
          </ul>
        )}
      </nav>
      ;
    </div>
  );
};

export default NavBar;
