import { getEmployeeFromFileById, getEmployeeFromDbByUsername } from './employeesServices.js';

export const login = async (username) => {     
    try {
        // Return the employee from the DB and his full name from the json file
        const dbEmployee = await getEmployeeFromDbByUsername(username);
        if (!dbEmployee) return null;
        
        const fileEmployee = await getEmployeeFromFileById(dbEmployee._id);
        if (!fileEmployee) return null;
    
        const fullName = fileEmployee.firstName + " " + fileEmployee.lastName;
        
        return {...dbEmployee._doc, fullName};
    } catch (error) {
        console.log(error.message);
    }
};