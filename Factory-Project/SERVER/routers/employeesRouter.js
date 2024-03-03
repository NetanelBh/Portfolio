import express from "express";

import * as empsService from "../services/epmloyeesService.js";
import {getWorkSchedule} from '../services/shiftsService.js';

const router = express.Router();

// GET EMPLOYEES
router.get("/", async (req, res) => {
  try {
    const employees = await empsService.getEmployeesData();
    res.send({success: true, data: employees});
  } catch (error) {
    res.send({success: false, data: error});
  }
});

router.get('/schedule', async (req, res) => {
  try {
    const schedule = await getWorkSchedule();
    res.send({success: true, data: schedule});
  } catch (error) {
    res.send({success: false, data: error});
  }
})

// CREATE EMPLOYEE
router.post("/", async (req, res) => {
  try {
    const employee = req.body;
    const resp = await empsService.addEmployee(employee);
    if (resp) {
      res.send({ success: true, data: resp });
    } else {
      res.send({ success: false, data: "Added employee failed" });
    }
  } catch (error) {
    res.send({ success: false, data: error });
  }
});

// Insert the employee to the specific shift
router.patch("/shift/:id", async (req, res) => {
  const shiftId = req.params.id;
  const { employeeId } = req.body;
  try {
    const resp = await empsService.addEmployeeToshift(shiftId, employeeId);
    if (resp) {
      res.send({ success: true, data: resp });
    } else {
      res.send({ success: false, data: "Can't add employee to shift" });
    }
  } catch (error) {
    res.send({ success: false, data: error });
  }
});

// UPDATE EMPLOYEE - PATCH
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const resp = await empsService.updatedEmployees(id, updatedData);
    if (resp) {
      res.send({ success: true, data: resp });
    } else {
      res.send({ success: false, data: "Can't update employee" });
    }
  } catch (error) {
    res.send({ success: false, data: error });
  }
});

// DELETE EMPLOYEE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Delete the employee from the DB
    const resp = await empsService.deleteEmployee(id);
    if (resp) {
      // Delete the employee from workSchedule collectins
      empsService.deleteEmployeeFromShift(resp.id);
      res.send({ success: true, data: "Employee successfully deleted" });
    } else {
      res.send({ success: false, data: "Can't delete employee" });
    }
  } catch (error) {
    res.send({ success: false, data: error });
  }
});

export default router;
