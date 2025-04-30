import employeesModel from "../models/employeesModel.js";

export const addEmployee = (employee) => {
    const newEmployee = employeesModel(employee);
    return newEmployee.save();
};

export const getEmployeesFromDb = () => {
    return employeesModel.find();
};

export const getEmployeeFromDbById = (id) => {
    return employeesModel.findById(id);
};

export const getEmployeeFromDbByUsername = (username) => {
    return employeesModel.findOne({ username });
};

export const updateEmployeePassword = (userName, encryptedPassword) => {
    const condition = { username: userName };
    const data = { password: encryptedPassword };
    // Option to return the updated document rather than the original one.
    const options = { new: true };
    
    // Return the employee without the password field
    return employeesModel.findOneAndUpdate(condition, data, options).select("-password");
};

export const updateUsername = (userName, updatedUsername) => {
    // The condition to find the employee is the user name and this condition also used to update the new username
    const condition = { username: userName };
    const data = { username: updatedUsername };
    // Option to return the updated document rather than the original one.
    const options = { new: true };
    
    return employeesModel.findOneAndUpdate(condition, data, options);
};

export const deleteEmployeeFromDb = (id) => {
    return employeesModel.findByIdAndDelete(id);
};
