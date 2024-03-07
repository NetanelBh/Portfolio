import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/login/login";

import Employees from "./components/employees/employees";
import AddEmployee from "./components/employees/addEmployee";
import EditEmployee from './components/employees/editEmployee';

import Department from "./components/departments/department";
import AddDepartment from "./components/departments/addDepartment";
import EditDepartment from "./components/departments/editDepartment";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/employees", element: <Employees /> },
    { path: "/employees/add", element: <AddEmployee /> },
    { path: "/employees/edit", element: <EditEmployee /> },
    { path: "/departments", element: <Department /> },
    { path: "/departments/add", element: <AddDepartment /> },
    { path: "/departments/edit", element: <EditDepartment /> },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
