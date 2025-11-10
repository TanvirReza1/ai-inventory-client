import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import LogIn from "../Pages/LogIn";
import Register from "../Pages/Register";
import Models from "../Pages/Models";
import ModelDetails from "../Pages/ModelDetails";
import Home from "../Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "home", Component: Home },
      { path: "logIn", Component: LogIn },
      { path: "register", Component: Register },
      { path: "models", Component: Models },

      {
        path: "/models/:id",
        element: <ModelDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/models/${params.id}`), //
      },
    ],
  },
]);
export default router;
