import {
  createBrowserRouter,
  Link,
} from "react-router-dom";
import Home from "../pages/Home";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    Component:(Home)
  }
]);
