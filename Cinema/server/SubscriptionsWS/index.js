import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import DbConnection from "./config/DBConnection.js";
import moviesRouter from "./routers/moviesRouter.js";
import membersRouter from "./routers/membersRouter.js";
import subscriptionsRouter from "./routers/subscriptionsRouter.js";

// // Initialize the DB only one time when the server is loaded for the first time
// import initializeDB from './utils/initDb.js';
// initializeDB();

const app = express();
const port = process.env.PORT;

DbConnection();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/movies", moviesRouter);
app.use("/members", membersRouter);
app.use("/subscriptions", subscriptionsRouter);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
