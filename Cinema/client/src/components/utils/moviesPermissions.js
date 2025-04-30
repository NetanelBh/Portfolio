export const isShowPermission = (employees, employeeId, permissionType) => {            
    const emp = employees.find(employee => employee.id === employeeId);
    if (emp) {
        return emp.permissions.includes(permissionType);
    }
    return false;
};