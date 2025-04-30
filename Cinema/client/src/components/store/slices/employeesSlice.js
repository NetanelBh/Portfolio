import { createSlice } from "@reduxjs/toolkit";

// isChanged property indicates whether some employee changed in DB
const initialState = { employees: [], readFromDb: false};

const employeesSlice = createSlice({
	name: "employees",
	initialState,
	reducers: {
        // Load the employees list at the beginning from the database and the data json files
		load(state, action) {
			state.employees = action.payload.employees;
            state.readFromDb = false;
		},
		// When added employee, read again from the DB to update the new employee with the created MONGO's id
		add(state) {
            state.readFromDb = true;
		},
		// Remove employee from the employees list
		remove(state, action) {
			const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
			if (index !== -1) {
				state.employees.splice(index, 1);
                state.readFromDb = false;
			}
		},
		// action.payload gets the employee id and the permissions updated array
		editPermissions(state, action) {
			const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
			if (index !== -1) {
				state.employees[index].permissions = action.payload.permissions;
                state.readFromDb = false;
			}
		},
        // Edit employee object in employees list
        editEmployee(state, action) {
            const index = state.employees.findIndex((emp) => emp.id === action.payload.employee.id);
            if (index !== -1) {
                state.employees[index] = action.payload.employee;
            }
            state.readFromDb = false;
        },
        // If the admin changed the username, will call this fuction to read the updated data from the DB
        userNameChange(state) {
            state.readFromDb = true;
        }

	},
});

export const employeesActions = employeesSlice.actions;
export default employeesSlice.reducer;
