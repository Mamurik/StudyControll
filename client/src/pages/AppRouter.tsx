import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { IRoute, privateRoutes, publicRoutes } from "../routes";
import { selectIsAuth } from "../store/Slices/userSlice";
import UserLabProgress from "./Progress/UserLabProgress";
const AppRouter = () => {
  const isAuth = useSelector(selectIsAuth);
  return (
    <Routes>
      <Route path="/" element={<UserLabProgress />}></Route>
      {isAuth &&
        privateRoutes.map((route: IRoute) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          );
        })}
      {publicRoutes.map((route: IRoute) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        );
      })}
    </Routes>
  );
};

export default AppRouter;
