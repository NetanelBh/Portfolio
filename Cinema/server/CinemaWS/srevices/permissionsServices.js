import fs from "fs";

import * as fileRepo from "../repositories/fileRepo.js";

const JSONPATH = process.cwd() + "/data/permissions.json";

export const getEmployeesPermissions = () => {
    return fileRepo.getDataFromJson(JSONPATH);
};

export const addEmployee = async (employee) => {
    let employees = {};
    // Check if the file exists, if not, create the json template
    if (fs.existsSync(JSONPATH)) {
        employees = await getEmployeesPermissions();
        employees.permissions.push({ ...employee });
    } else {
        // Create the employee object template should be written to the JSON file
        employees = { permissions: [{ ...employee }] };
    }
    fileRepo.writeDataToJson(JSONPATH, employees);
};

export const updatePermissions = async (employeeId, permissionsList) => {
    try {
        const permissions = await fileRepo.getDataFromJson(JSONPATH);
    
        // Update the new permissions for the corresponding employee
        permissions.permissions.forEach((perm) => {
            if (perm.id === employeeId) {
                perm.permissions = permissionsList;
            }
        });
    
        // Save the permissions to the JSON file
        await fileRepo.writeDataToJson(JSONPATH, permissions);
        return permissions;
    } catch (error) {
        
    }
};

export const deleteEmployee = async (employeeId) => {
    // When delete employee from the system, will remove the employee's permissions from the JSON file
    try {
        const empPermissions = await getEmployeesPermissions();
        const index = empPermissions.permissions.findIndex((emp) => emp.id === employeeId);
        if (index !== -1) {
            empPermissions.permissions.splice(index, 1);
        }
        fileRepo.writeDataToJson(JSONPATH, empPermissions);
        return employeeId;
    } catch (error) {
        return error.message;
    }
};
