import { Link } from "react-router-dom";
import { USERLABPROGRESS_ROUTE } from "../../utils/consts";
import classes from "./Main.module.css";
const Main = () => {
  return (
    <div className={classes.main_part}>
      <h1 className={classes.main_h1}>
        Привет, это приложение для контроля твоей успеваемости
      </h1>

      <Link className={classes.main_link} to={USERLABPROGRESS_ROUTE}>
        Нажми, чтобы узнать свой прогресс
      </Link>
    </div>
  );
};

export default Main;
