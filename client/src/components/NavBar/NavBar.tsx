import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectIsAuth } from "../../store/Slices/userSlice";
import { ADMIN_ROUTE, LOGIN_ROUTE } from "../../utils/consts";
import classes from "./NavBar.module.css";

const NavBar = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <nav className={classes.navbar}>
        <div>
          <Link className={classes.list_item_link} to={"/"}>
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
              <Link to={"/"}>
                <button
                  className={classes.list_item_but}
                  onClick={handleLogout}
                >
                  Выйти{" "}
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
    </div>
  );
};

export default NavBar;
