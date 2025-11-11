import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import LogIn from "../Pages/LogIn";
import Register from "../Pages/Register";
import Models from "../Pages/Models";
import ModelDetails from "../Pages/ModelDetails";
import Home from "../Pages/Home";
import UpdateModel from "../Pages/UpdateModel";
import MyModels from "../Pages/MyModels";
import MyModelPurchases from "../Pages/MyPurchase";
import AddModel from "../Pages/AddModel";
import PrivateRoute from "../Private/PrivateRoute";
import ErrorPage from "../Pages/ErrorPage";

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
        element: (
          <PrivateRoute>
            <ModelDetails />
          </PrivateRoute>
        ),

        loader: ({ params }) =>
          fetch(`http://localhost:3000/models/${params.id}`), //
      },
      {
        path: "/update-model/:id",
        element: (
          <PrivateRoute>
            <UpdateModel></UpdateModel>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-models",
        element: (
          <PrivateRoute>
            <MyModels></MyModels>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-purchase",
        element: (
          <PrivateRoute>
            <MyModelPurchases></MyModelPurchases>
          </PrivateRoute>
        ),
      },
      {
        path: "add-model",
        element: (
          <PrivateRoute>
            <AddModel></AddModel>
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
]);
export default router;
