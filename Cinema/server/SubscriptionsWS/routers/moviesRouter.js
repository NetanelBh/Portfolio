import express from "express";

import * as moviesServices from "../services/moviesServices.js";

const router = express.Router();

// Entry point: http://localhost:3001/movies

router.get("/get", async (req, res) => {
	try {
		const resp = await moviesServices.getMoviesFromDb();
		if (resp) {
			res.send({ status: true, data: resp });
		} else {
			res.send({ status: false, data: "No movies found" });
		}
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

router.post("/add", async (req, res) => {
	const movie = req.body;
	try {
		const resp = await moviesServices.addMovie(movie);
		if (resp) {
			res.send({ status: true, data: resp });
		} else {
			res.send({ status: false, data: "Added movie failed" });
		}
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

router.put("/update", async (req, res) => {
	const movie = req.body;
	
    try {
        const resp = await moviesServices.updateMovie(movie);
        if (resp) {
			res.send({ status: true, data: resp });
		} else {
			res.send({ status: false, data: "No movie found with this ID" });
		}
    } catch (error) {
        res.send({ status: false, data: error.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
	const id = req.params.id;

    try {
        const resp = await moviesServices.deleteMovie(id);
		if (resp !== null) {	
			res.send({ status: true, data: resp });
		} else {
			res.send({ status: false, data: "No movie found with this ID" });
		}
    } catch (error) {
        res.send({ status: false, data: error.message });
    }
});

export default router;
