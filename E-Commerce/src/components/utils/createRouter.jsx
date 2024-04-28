import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/login/Login";
import Layout from "../pages/layout/Layout";

import Customers from "../pages/admin/Customers";
import Categories from "../pages/admin/Categories";
import Statistics from "../pages/admin/Statistics";
import AdminProducts from "../pages/admin/AdminProducts";

import Orders from "../pages/users/Orders";
import Logout from "../pages/users/Logout";
import MyAccount from "../pages/users/MyAccount";
import UserProducts from "../pages/users/UserProducts";
import UserRegistration from "../pages/users/UserRegistration";

const CreateRouter = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/register", element: <UserRegistration /> },
    {
      path: "/layout",
      element: <Layout />,
      children: [
        { path: "/layout/adminCategory", element: <Categories /> },
        { path: "/layout/adminProd", element: <AdminProducts /> },
        { path: "/layout/customers", element: <Customers /> },
        { path: "/layout/statistics", element: <Statistics /> },
        { path: "/layout/userProd", element: <UserProducts /> },
        { path: "/layout/userOrders", element: <Orders /> },
        { path: "/layout/userAccount", element: <MyAccount /> },
        { path: "/layout/logout", element: <Logout /> },
      ],
    },
  ]);

  return router;
};

export default CreateRouter;