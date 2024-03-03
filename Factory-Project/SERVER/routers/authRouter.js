import express from "express";
import jwt from "jsonwebtoken";

import * as authService from "../services/authService.js";

// ENTRY POINT: http://localhost:3001/auth

const router = express.Router();

router.post("/login", async (req, res) => {
  const { user, email } = req.body;
  if (!user) {
    return res.status(401).json({ success: false, data: "Enter username" });
  }

  if (!email) {
    return res.status(401).json({ success: false, data: "Enter email" });
  }

  // Let the user log in only if he is out of the system
  if (!req.session.user) {
    // Check authentication for username and email
    try {
      const resp = await authService.login(user, email);
      if (!resp.success) {
        return res.send({ success: false, data: resp.data });
      }

      // Not let the user login, if he exceeded his daily limit
      const isAccess = await authService.checkUserLimitActions(user);
      if (!isAccess) {
        req.session.resp = {
          success: false,
          data: "Can't login, you exceeded your daily limit",
        };
        return res.redirect("logout");
      }

      // Generate token to user
      const token = jwt.sign({ username: user }, process.env.KEY);
      // Save the user and token in the session for authentication in pages
      req.session.user = { userName: user, token };

      return res.send({ success: true, data: token });
    } catch (error) {
      return res.status(401).json({ success: false, data: "Can't login" });
    }
  } else {
    return res.send({ success: false, data: "The user logged in already" });
  }
});

router.get("/logout", (req, res) => {
  const updatedData = {};
  if (req.session.resp) {
    const reqContent = { ...req.session.resp };
    updatedData.success = reqContent.success;
    // If before the login we know that we exceeded the daily limit
    if (reqContent.data.includes("Can't login")) {
      updatedData.data = reqContent.data;
    } else {
      // This message happens during users requests when he is logged in
      updatedData.data = reqContent.data + ",  logging out";
    }
  } else {
    updatedData.success = true;
    updatedData.data = "Succesfully logged out";
  }
  // When logout, remove the user from the session to let him login later
  req.session.destroy();

  res.send(updatedData);
});

export default router;
