import Lab from "./components/Lab/Lab";
import Admin from "./pages/Admin/Admin";
import Auth from "./pages/Auth/Auth";
import Subjects from "./pages/Subject/Subjects";
import UserLabProgress from "./pages/Progress/UserLabProgress";
import { ADMIN_ROUTE, LAB_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SUBJECTS_ROUTE, USERLABPROGRESS_ROUTE } from "./utils/consts";

export interface IRoute {
  path: string;
  element: React.ComponentType; 
}

export const privateRoutes: IRoute[] = [
  {
    path: ADMIN_ROUTE,
    element: Admin,
  },
  {
    path:USERLABPROGRESS_ROUTE,
    element:UserLabProgress
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