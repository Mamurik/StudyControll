import Admin from "./pages/Admin";
import { ADMIN_ROUTE } from "./utils/consts";

export interface IRoute {
  path: string;
  element: React.ComponentType; 
}

export const privateRoutes: IRoute[] = [
  {
    path: ADMIN_ROUTE,
    element: Admin,
  },
];
