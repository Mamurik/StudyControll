import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Loader from "./components/UI/Loader/Loader";
import { check } from "./http/userApi";
import AppRouter from "./pages/AppRouter";
import { setIsAuth, setUser } from "./store/Slices/userSlice";
import { RootState } from "./store/store";
const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  useEffect(() => {
    check()
      .then((data: any) => {
        dispatch(setUser(data));
        dispatch(setIsAuth(true));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
