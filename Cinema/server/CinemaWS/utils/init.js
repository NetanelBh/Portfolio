import {
  addEmployeeToDb,
  addEmployeeToFile,
} from "../srevices/employeesServices.js";
import { addEmployee } from "../srevices/permissionsServices.js";

const initEmployeesFile = (type, data) => {
  switch (type) {
    case "employee":
      addEmployeeToFile(data);
      break;
    case "permissions":
      addEmployee(data);
    default:
      break;
  }
};

const saveInDb = (admin) => {
  return addEmployeeToDb(admin);
};

const createEmployeeObj = (type) => {
  switch (type) {
    case "admin":
      return {
        username: "Netanel",
        password: "123",
        admin: true,
      };
    case "employee":
      return {
        id: "",
        firstName: "Netanel",
        lastName: "Ben hamo",
        CreatedDate: new Date().toLocaleDateString(),
        sessionTimeOut: 10,
      };
    case "permissions":
      return {
        id: "",
        permissions: [
          "View Subscription",
          "Create Subscriptions",
          "Delete Subscriptions",
          "Update Subscription",
          "View Movies",
          "Create Movies",
          "Delete Movies",
          "Update Movie"
        ],
      };
    default:
      break;
  }
};

// When the server starts at the first time, will create the employees collection only with the admin
const initialize = async () => {
  // Create the admin object to DB
  const admin = createEmployeeObj("admin");
  const savedEmployee = await saveInDb(admin);

  // Create the employee object to store in employees.json file
  const employeeInJson = createEmployeeObj("employee");
  employeeInJson.id = savedEmployee.id;
  initEmployeesFile("employee", employeeInJson);

  const permissions = createEmployeeObj("permissions");
  permissions.id = savedEmployee.id;
  initEmployeesFile("permissions", permissions);
};

export default initialize;
