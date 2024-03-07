import "dotenv/config";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import session from "express-session";

import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/usersRouter.js";
import DbConnection from "./configs/dbConnection.js";
import shiftsRouter from "./routers/shiftsRouter.js";
import CheckDayChanging from "./utils/isDayChanged.js";
import depsRouter from "./routers/departmentsRouter.js";
import employeesRouter from "./routers/employeesRouter.js";
import { resetUsersDailyActions } from "./services/usersService.js";
import { checkLimitActions, addActionToUser } from "./services/usersService.js";

const app = express();
const PORT = process.env.PORT || 3001;

DbConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Create sessions for the client to track his actions and authenticate
app.use(
  session({
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: true,
  })
);

// Route for user login
app.use("/auth", authRouter);

// middleware for token authentication and update actions in DB and json file
app.use(async (req, res, next) => {
  // First check if the user logged in to system
  if (req.session && req.session.user) {
    // extract the user and the generated token from req.session.user to verify
    const { userName, token } = req.session.user;
    //Extract the token from the user current request
    const requestToken = req.headers["x-access-token"];

    if (!token) return res.status(401).json("No token provided by the user");
    // Check if token from the user request equals to generated token from login
    if (token !== requestToken) return res.status(401).json("Invalid token");

    // Try catch block for token authentication
    try {
      jwt.verify(token, process.env.KEY);
    } catch (error) {
      return res.status(401).json("Invalid token");
    }

    // try catch block for checking the user's daily actions limit
    try {
      const isAccess = await checkLimitActions(userName);
      if (!isAccess) {
        req.session.resp = {
          success: false,
          data: "exceeded your daily limit",
        };
        return res.redirect("/auth/logout");
      }
    } catch (error) {
      return res.send(error);
    }

    // try catch block to write the user's action to json file and DB
    try {
      const resp = await addActionToUser(userName);
      if (!resp.success) {
        return res.send(resp);
      }
    } catch (error) {
      return res.send(error);
    }

    next();
  } else {
    return res.status(401).json("Please login first");
  }
});

// Controllers to all possible user requests
app.use("/users", userRouter);
app.use("/shifts", shiftsRouter);
app.use("/departments", depsRouter);
app.use("/employees", employeesRouter);

// Variable to store the last checked day
let lastCheckedDay = new Date().getDate();
// Check every minute if the day changed
setInterval(async () => {
  const {isDayChanged, newDay} = CheckDayChanging(lastCheckedDay);
  if (isDayChanged) {
    lastCheckedDay = newDay;
    try {
      await resetUsersDailyActions();
    } catch (error) {
      console.log(error);
    }
  }
}, 60000);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
