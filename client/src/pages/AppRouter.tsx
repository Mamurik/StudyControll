import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { adminRoutes, IRoute, privateRoutes, publicRoutes } from "../routes";
import { selectIsAuth } from "../store/Slices/userSlice";
import Main from "./Main/Main";
import { RootState } from "../store/store";
const AppRouter = () => {
  const isAuth = useSelector(selectIsAuth);
  const userRole = useSelector((state: RootState) => state.user.user?.role);
  return (
    <Routes>
      {userRole === "admin" &&
        adminRoutes.map((route: IRoute) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            ></Route>
          );
        })}
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
