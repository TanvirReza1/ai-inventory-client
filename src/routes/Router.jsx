import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import LogIn from "../Pages/LogIn";
import Register from "../Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { path: "logIn", Component: LogIn },
      { path: "register", Component: Register },
    ],
  },
]);
export default router;
