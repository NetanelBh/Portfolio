import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/login/login";
import Register from "../pages/register/register";

import MainLayout from "../UI/layouts/mainLayout";
import WebContentLayout from "../UI/layouts/WebContentLayout";

import AddEmployee from "../pages/employees/addEmployee";
import AllEmployees from "../pages/employees/allEmployees";
import EditEmployee from "../pages/employees/editEmployee";

import AllMovies from "../pages/movies/allMovies";
import AddMovie from "../pages/movies/addMovie";
import EditMovie from "../pages/movies/editMovie";

import AllSubscriptions from "../pages/subscriptions/allSubscriptions";
import AddSubscription from "../pages/subscriptions/addSubscription";
import EditSubscription from "../pages/subscriptions/editSubscription";

const CreateRouter = () => {
    const router = createBrowserRouter([
        { path: "/", element: <Login /> },
        { path: "/register", element: <Register /> },
        {
            path: "/layout",
            element: <MainLayout />,
            children: [
                {
                    path: "/layout/WebContentLayout",
                    element: <WebContentLayout />,
                    children: [
                        { path: "/layout/WebContentLayout/employees/all", element: <AllEmployees /> },
                        { path: "/layout/WebContentLayout/employees/add", element: <AddEmployee /> },
                        { path: "/layout/WebContentLayout/movies/all", element: <AllMovies /> },
                        { path: "/layout/WebContentLayout/movies/add", element: <AddMovie /> },
                        { path: "/layout/WebContentLayout/subscriptions/all", element: <AllSubscriptions /> },
                        { path: "/layout/WebContentLayout/subscriptions/add", element: <AddSubscription /> },
                    ],
                },
                {path: "/layout/editEmployee", element: <EditEmployee />},
                {path: "/layout/editMovie", element: <EditMovie />},
                {path: "/layout/editSubscription", element: <EditSubscription />},
            ],
        },
    ]);

    return router;
};

export default CreateRouter;
