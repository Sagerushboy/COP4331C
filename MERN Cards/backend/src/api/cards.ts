import { Router } from "express";
import User from "../models/User";
import Card from "../models/Card";

const router = Router();

router.post("/login", async (req, res) => {
	const { username } = req.body;

	// only username in user collection of mongodb
	let data = await User.findOne({ username }).exec();

	if (data !== undefined || data !== null) {

		res.status(200).json({ data });
	} else {
		res.status(400).json({ error: "Invalid user" });
	}
});

router.post("/add", async (req, res) => {
	const { name } = req.body;

	if (name === "") {
		res.status(400);
		return;
	}

	let search = await Card.find({ name }).exec();

	if (search.length > 0) {
		res.status(400);
		return;
	}

	let newCard = new Card({ name });
	await newCard.save();

	res.status(200);
});

router.get("/search", async (req, res) => {
	const { name } = req.query; // using query for get request since body is not allowed

	if (name == null || name == undefined) return; // name could be ""

	let cards = [];

	if (name === "") {
		cards = await Card.find({}).exec();
	} else {
		cards = await Card.find({ name: { "$regex": name, "$options": "i" } }).exec();
	}

	res.json({ cards });
});

export default router;