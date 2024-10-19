import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./pages/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
const App = () => {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
