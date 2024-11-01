import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { IRoute, privateRoutes, publicRoutes } from "../routes";
import { selectIsAuth } from "../store/Slices/userSlice";
import Main from "./Main/Main";
const AppRouter = () => {
  const isAuth = useSelector(selectIsAuth);
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
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
