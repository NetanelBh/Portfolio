import express from "express";

import * as usersService from "../services/usersService.js";

// ENTRY POINT: http://localhost:3001/users

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Get the basic users data
    const users = await usersService.getUsers();
    return res.send({ success: true, data: users });
  } catch (error) {
    return res.send({success: false, data: error});
  }
});

export default router;
