import { Router } from "express";
import User from "../models/User";
import Card from "../models/Card";

const router = Router();

router.post("/login", async (req, res) => {
	const { username } = req.body;
	// TEMP FOR LOCAL TESTING.

	if (username == "alex") {
		let data = await User.findOne({ username: "alex" }).exec();

		res.status(200).json({ data });
	} else {
		res.status(400).json({ error: "Invalid user" });
	}
});

router.post("/add", async (req, res) => {
	const { name } = req.body;
	// TEMP FOR LOCAL TESTING.

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
	console.log("Search running")
	const { name } = req.query;
	// TEMP FOR LOCAL TESTING.

	console.log(name);

	if (name == null || name == undefined) return;

	let cards = [];

	if (name === "") {
		console.log("Empty");
		cards = await Card.find({}).exec();
	} else {
		console.log("Not Empty");
		cards = await Card.find({ name: { "$regex": name, "$options": "i" } }).exec();
	}

	res.json({
		cards
	});
});

export default router;