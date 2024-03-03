import express from "express";

import * as depsService from "../services/departmentsService.js";

// ENTRY POINT: http://localhost:3001/departments

const router = express.Router();

// GET all employees that not working in the given department
router.get("/:id", async (req, res) => {
  const depId = req.params.id;
  try {
    const resp = await depsService.getAllEmployeesNotInDepartment(depId);
    if (resp.success) {
      return res.send({ success: true, data: resp.data });
    } else {
      return res.send({ success: false, data: "No employees not from dep" });
    }
  } catch (error) {
    return res.send({ success: false, data: error });
  }
});

// GET all departments
router.get("/", async (req, res) => {
  try {
    const deps = await depsService.getDepartments();
    res.send({success: true, data: deps});
  } catch (error) {
    res.send({success: false, data: error});
  }
});

// ADD new department
router.post("/", async (req, res) => {
  const department = req.body;
  if (!department) {
    return res.send({ success: false, data: "Please enter department name" });
  }

  try {
    const resp = await depsService.addDepartment(department);
    if (resp) {
      res.send({ success: true, data: "Successfully added department" });
    } else {
      res.send({ success: false, data: "Can't add department" });
    }
  } catch (error) {
    return res.send({ success: false, data: error });
  }
});

// Update employee department according to selected department
router.patch('/allocate/:id', async (req, res) => {
  const depId = req.params.id;
  const empId = req.body.id;

  try {
    const resp = await depsService.allocateEmployeeToDepartment(empId, depId);
    if(resp) {
      return res.send({success: true, data: "Successfully allocated employee"});
    } else {
      return res.send({success: false, data: "Couldn't allocate employee"});
    }
  } catch (error) {
    return res.send({success: false, data: error});
  }
});

// UPDATE department
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const department = req.body;

  try {
    const resp = await depsService.updateDepartment(id, department);
    if (resp) {
      return res.send({
        success: true,
        data: "Successfully updated department",
      });
    } else {
      return res.send({ success: false, data: "Couldn't update department" });
    }
  } catch (error) {
    return res.send({ success: false, data: error });
  }
});

// DELETE all departments
router.delete("/", async (req, res) => {
  try {
    const resp = await depsService.deleteAllDepartments();
    return res.send({success: true, data: resp});
  } catch (error) {
    return res.send({ success: false, data: "Ecountered with some problem" });
  }
});

export default router;
