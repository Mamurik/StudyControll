import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./pages/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import UserLabProgress from "./pages/UserLabProgress";
const App = () => {
  const subjects = [
    {
      subjectName: "Математика",
      totalLabs: 3,
      labs: [
        { labNumber: 1, maxPoints: 5, currentPoints: 3 },
        { labNumber: 2, maxPoints: 5, currentPoints: 5 },
        { labNumber: 3, maxPoints: 5, currentPoints: 2 },
      ],
    },
    {
      subjectName: "Физика",
      totalLabs: 2,
      labs: [
        { labNumber: 1, maxPoints: 5, currentPoints: 5 },
        { labNumber: 2, maxPoints: 5, currentPoints: 4 },
      ],
    },
  ];

  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
