import Lab from "./components/Lab/Lab";
import Admin from "./pages/Admin/Admin";
import Auth from "./pages/Auth/Auth";
import Subjects from "./pages/Subject/Subjects";
import UserLabProgress from "./pages/Progress/UserLabProgress";
import { ADMIN_ROUTE, LAB_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, SUBJECTS_ROUTE, USERLABPROGRESS_ROUTE } from "./utils/consts";
import Main from "./pages/Main/Main";

export interface IRoute {
  path: string;
  element: React.ComponentType; 
}

export const adminRoutes  :IRoute[] = [
  {
    path: ADMIN_ROUTE,
    element: Admin,
  },
]
export const privateRoutes: IRoute[] = [
  
  {
    path:USERLABPROGRESS_ROUTE,
    element:UserLabProgress
  },
  {
    path:MAIN_ROUTE,
    element:Main
  }
];
export const publicRoutes: IRoute[]= [
    {
     path: LOGIN_ROUTE,
     element: Auth,
    },
    {
     path:REGISTRATION_ROUTE,
     element:Auth
    },
    {
     path:SUBJECTS_ROUTE,
     element:Subjects
    },
    {
      path:LAB_ROUTE,
      element:Lab
     }
]