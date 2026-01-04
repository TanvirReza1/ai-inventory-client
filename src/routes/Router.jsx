import React, { useEffect } from "react";
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
import DashboardLayout from "../Pages/DashboardLayout/DashboardLayout";
import Overview from "../Pages/DashboardLayout/Overview";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Privacy from "../Pages/Privacy";

// ✅ Title Wrapper Component
const WithTitle = ({ Component, title }) => {
  useEffect(() => {
    document.title = `${title} | AI Model Inventory`;
  }, [title]);
  return <Component />;
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, element: <WithTitle Component={Home} title="Home" /> },
      { path: "home", element: <WithTitle Component={Home} title="Home" /> },
      {
        path: "about",
        element: <WithTitle Component={About} title="About" />,
      },
      {
        path: "contact",
        element: <WithTitle Component={Contact} title="Contact" />,
      },
      {
        path: "privacy",
        element: <WithTitle Component={Privacy} title="Privacy Policy" />,
      },

      {
        path: "logIn",
        element: <WithTitle Component={LogIn} title="Log In" />,
      },
      {
        path: "register",
        element: <WithTitle Component={Register} title="Register" />,
      },
      {
        path: "models",
        element: <WithTitle Component={Models} title="Models" />,
      },

      {
        path: "/models/:id",
        element: <WithTitle Component={ModelDetails} title="Model Details" />,
        loader: ({ params }) =>
          fetch(
            `https://ai-model-inventory-server-omega.vercel.app/models/${params.id}`
          ),
      },
      {
        path: "/update-model/:id",
        element: (
          <PrivateRoute>
            <WithTitle Component={UpdateModel} title="Update Model" />
          </PrivateRoute>
        ),
      },

      {
        path: "/my-models",
        element: (
          <PrivateRoute>
            <WithTitle Component={MyModels} title="My Models" />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-purchase",
        element: (
          <PrivateRoute>
            <WithTitle Component={MyModelPurchases} title="My Purchases" />
          </PrivateRoute>
        ),
      },
      {
        path: "add-model",
        element: (
          <PrivateRoute>
            <WithTitle Component={AddModel} title="Add Model" />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <WithTitle Component={ErrorPage} title="404 - Not Found" />,
      },
    ],
  },

  // 🔐 DASHBOARD ROUTES (SEPARATE)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Overview /> },
      { path: "my-models", element: <MyModels /> },
      { path: "my-purchase", element: <MyModelPurchases /> },
      { path: "add-model", element: <AddModel /> },
      { path: "update-model/:id", element: <UpdateModel /> },
    ],
  },
]);

export default router;
