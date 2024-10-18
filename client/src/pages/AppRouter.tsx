import React from "react";
import { Routes, Route } from "react-router-dom";
import { IRoute, privateRoutes } from "../routes";

const AppRouter = () => {
  const isAuth = false;
  return (
    <Routes>
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
    </Routes>
  );
};

export default AppRouter;
